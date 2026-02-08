import Question from "../models/Question.js";
import Answer from "../models/Answer.js";
import InterviewSession from "../models/Interview.js";
import { evaluateAnswer } from "../services/evaluation.service.js";

export const startInterview = async (req, res) => {
  try {
    const { role, difficulty } = req.body;
    if (!role || !difficulty) {
      return res
        .status(400)
        .json({
          message: "Role and difficulty are required to start an interview.",
        });
    }
    const questionExists = await Question.exists({ role, difficulty });
    if (!questionExists) {
      return res
        .status(404)
        .json({
          message:
            "No questions available for the specified role and difficulty.",
        });
    }
    const session = await InterviewSession.create({
      user: req.user._id,
      role,
      difficulty,
    });
    res
      .status(201)
      .json({
        message: "Interview session started successfully",
        sessionId: session._id,
        status: session.status,
      });
  } catch (error) {
    console.error("Error starting interview session:", error);
    return res
      .status(500)
      .json({ message: "Internal server error in starting interview session" });
  }
};

export const getNextQuestion = async (req, res) => {
  try {
    const { sessionId } = req.params;

    const session = await InterviewSession.findById(sessionId);
    if (!session || session.status !== "ongoing") {
      return res
        .status(400)
        .json({ message: "Invalid or completed interview session." });
    }
    const answerdIds = session.answeredQuestions.map((aq) => aq.question);
    const question = await Question.findOne({
      role: session.role,
      difficulty: session.difficulty,
      _id: { $nin: answerdIds },
    }).select("questionText");

    if (!question) {
      session.status = "completed";
      await session.save();
      return res.status(200).json({ message: "Interview completed !!!" });
    }
    res.json({ questionId: question._id, questionText: question.questionText });
  } catch (error) {
    console.error("Error fetching question:", error);
    return res
      .status(500)
      .json({ message: "Internal server error in question controller" });
  }
};

export const submitAnswer = async (req, res) => {
  try {
    const { questionId, userAnswer } = req.body;
    const { sessionId } = req.params;

    if (!questionId || !userAnswer) {
      return res
        .status(400)
        .json({ message: "Question ID and user answer are required." });
    }
    const session = await InterviewSession.findById(sessionId);

    if (!session || session.status !== "ongoing") {
      return res
        .status(400)
        .json({ message: "Invalid or completed interview session." });
    }
    const alreadyAnswered = session.answeredQuestions.some(
      (aq) => aq.question.toString() === questionId,
    );

    if (alreadyAnswered) {
      return res
        .status(400)
        .json({ message: "Question already answered in this session." });
    }

    // also ensure there is no stale duplicate Answer document
    const existingAnswer = await Answer.findOne({ user: req.user._id, question: questionId });
    // if (existingAnswer) {
    //   return res.status(400).json({ message: "Answer already submitted for this question." });
    // }
    const question = await Question.findById(questionId);
    if (!question) {
      return res.status(404).json({ message: "Question not found." });
    }

    const evaluation = evaluateAnswer({
      answer: userAnswer,
      modelAnswer: question.modelAnswer,
    });

    // persist scores consistently inside `scores` and also keep `finalScore` top-level
    await Answer.create({
      user: req.user._id,
      question: question._id,
      userAnswer,
      scores: {
        relevance: evaluation.relevance,
        confidence: evaluation.completeness,
        // store sentiment as numeric in scores for compatibility, keep string top-level
        sentiment: evaluation.sentiment === "positive" ? 1 : evaluation.sentiment === "negative" ? -1 : 0,
      },
      sentiment: evaluation.sentiment,
      finalScore: evaluation.finalScore,
    });

    session.answeredQuestions.push({ question: question._id, score: evaluation.finalScore });
    session.totalScore += evaluation.finalScore;
    await session.save();
    res.json({ message: "Answer submitted successfully", score: evaluation.finalScore });
  } catch (error) {
    console.error("Error submitting answer:", error);
    return res
      .status(500)
      .json({ message: "Internal server error in answer controller" });
  }
};

export const endInterview = async (req, res) => {
  try {
    const { sessionId } = req.params;

    const session = await InterviewSession.findById(sessionId);

    if (!session) {
      return res.status(404).json({ message: "Session not found" });
    }

    if (session.status !== "completed") {
      return res.status(400).json({
        message: "Interview not completed yet"
      });
    }

    const totalQuestions = session.answeredQuestions.length;
    const averageScore =
      totalQuestions > 0 ? session.totalScore / totalQuestions : 0;

    res.json({
      message: "Interview summary",
      sessionId: session._id,
      totalScore: session.totalScore,
      totalQuestions,
      averageScore: Number(averageScore.toFixed(2)),
    });
  } catch (err) {
    res.status(500).json({ message: "Error ending interview" });
  }
};

export const getInterviewFeedback = async (req, res) => {
  try {
    const { sessionId } = req.params;
    const session = await InterviewSession.findById(sessionId).populate(
      "answeredQuestions.question"
    );

    if (!session) {
      return res.status(404).json({ message: "Session not found" });
    }

    // only session owner or admin can fetch detailed feedback
    if (
      req.user.role !== "admin" &&
      session.user.toString() !== req.user._id.toString()
    ) {
      return res.status(403).json({ message: "Forbidden" });
    }

    const answeredQuestionIds = session.answeredQuestions.map((aq) =>
      aq.question && aq.question._id ? aq.question._id.toString() : aq.question.toString()
    );

    const answers = await Answer.find({
      user: session.user,
      question: { $in: answeredQuestionIds },
    }).populate("question", "questionText modelAnswer keywords");

    if (!answers || answers.length === 0) {
      return res.json({
        sessionId: session._id,
        status: session.status,
        message: "No answers found for this session",
      });
    }

    const normalizeValue = (ansDoc, key) => {
      if (!ansDoc) return null;

      // direct top-level
      if (Object.prototype.hasOwnProperty.call(ansDoc, key)) return ansDoc[key];

      // common alternatives mapping
      if (key === "completeness") {
        if (ansDoc.scores && Object.prototype.hasOwnProperty.call(ansDoc.scores, "completeness"))
          return ansDoc.scores.completeness;
        if (ansDoc.scores && Object.prototype.hasOwnProperty.call(ansDoc.scores, "confidence"))
          return ansDoc.scores.confidence;
        return null;
      }

      if (key === "relevance") {
        if (ansDoc.scores && Object.prototype.hasOwnProperty.call(ansDoc.scores, "relevance"))
          return ansDoc.scores.relevance;
        return null;
      }

      if (key === "finalScore" || key === "score") {
        if (Object.prototype.hasOwnProperty.call(ansDoc, "finalScore")) return ansDoc.finalScore;
        if (Object.prototype.hasOwnProperty.call(ansDoc, "score")) return ansDoc.score;
        if (ansDoc.scores && Object.prototype.hasOwnProperty.call(ansDoc.scores, "finalScore"))
          return ansDoc.scores.finalScore;
        return null;
      }

      // fallback to scores[key]
      if (ansDoc.scores && Object.prototype.hasOwnProperty.call(ansDoc.scores, key))
        return ansDoc.scores[key];

      return null;
    };

    const questionFeedback = answers.map((a) => {
      const q = a.question || null;
      const relevance = normalizeValue(a, "relevance") ?? null;
      const completeness = normalizeValue(a, "completeness") ?? null;
      const finalScore = normalizeValue(a, "finalScore") ?? normalizeValue(a, "score") ?? null;
      const sentimentLabel =
        typeof a.sentiment === "string" ? a.sentiment : normalizeValue(a, "sentiment");

      const suggestions = [];
      if (relevance !== null && relevance < 50) {
        if (q && q.keywords && q.keywords.length)
          suggestions.push(
            `Try to include keywords: ${q.keywords.slice(0, 5).join(", ")}`
          );
        else suggestions.push("Focus on matching the question keywords and intent.");
      }
      if (completeness !== null && completeness < 60) {
        suggestions.push(
          "Expand your answer with examples, trade-offs and complexity considerations."
        );
      }
      if (sentimentLabel && typeof sentimentLabel === "string" && sentimentLabel === "negative") {
        suggestions.push("Avoid negative phrasing; prefer constructive, confident language.");
      }

      return {
        questionId: q ? q._id : a.question,
        questionText: q ? q.questionText : undefined,
        modelAnswer: q ? q.modelAnswer : undefined,
        userAnswer: a.userAnswer,
        relevance,
        completeness,
        sentiment: sentimentLabel,
        finalScore,
        suggestions,
      };
    });

    // overall metrics
    const totalQuestions = questionFeedback.length;
    const totalScore = session.totalScore || questionFeedback.reduce((s, q) => s + (q.finalScore || 0), 0);
    const averageScore = totalQuestions > 0 ? Number((totalScore / totalQuestions).toFixed(2)) : 0;

    const strengths = [...questionFeedback]
      .filter((q) => typeof q.finalScore === "number")
      .sort((a, b) => b.finalScore - a.finalScore)
      .slice(0, 3)
      .map((q) => ({ questionId: q.questionId, score: q.finalScore }));

    const weaknesses = [...questionFeedback]
      .filter((q) => typeof q.finalScore === "number")
      .sort((a, b) => a.finalScore - b.finalScore)
      .slice(0, 3)
      .map((q) => ({ questionId: q.questionId, score: q.finalScore }));

    const recommendations = [];
    if (averageScore >= 80) recommendations.push("Excellent performance — keep refining polish and edge-cases.");
    else if (averageScore >= 60) recommendations.push("Good job — add more depth and examples to increase impact.");
    else recommendations.push("Work on coverage and structure: use examples, trade-offs, and keywords.");

    return res.json({
      sessionId: session._id,
      status: session.status,
      totalScore,
      totalQuestions,
      averageScore,
      questions: questionFeedback,
      strengths,
      weaknesses,
      recommendations,
    });
  } catch (error) {
    console.error("Error fetching interview feedback:", error);
    res.status(500).json({ message: "Error fetching interview feedback" });
  }
}

export const getUserSessions = async (req, res) => {
  try {
    const sessions = await InterviewSession.find({ user: req.user._id })
      .select("_id role difficulty status totalScore totalQuestions createdAt updatedAt")
      .sort({ createdAt: -1 });

    res.json({ sessions });
  } catch (error) {
    console.error("Error fetching user sessions:", error);
    res.status(500).json({ message: "Error fetching user sessions" });
  }
}

