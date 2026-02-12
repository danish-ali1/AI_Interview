import Question from "../models/Question.js";
import Answer from "../models/Answer.js";
import InterviewSession from "../models/Interview.js";
import { evaluateAnswer } from "../services/nlp.service.js";

export const startInterview = async (req, res) => {
  try {
    const { role, difficulty } = req.body;
    if (!role || !difficulty) {
      return res.status(400).json({
        message: "Role and difficulty are required to start an interview.",
      });
    }
    const questionExists = await Question.exists({ role, difficulty });
    if (!questionExists) {
      return res.status(404).json({
        message:
          "No questions available for the specified role and difficulty.",
      });
    }
    const session = await InterviewSession.create({
      user: req.user._id,
      role,
      difficulty,
    });
    res.status(201).json({
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

    const question = await Question.findById(questionId);
    if (!question) {
      return res.status(404).json({ message: "Question not found." });
    }

    const evaluation = await evaluateAnswer(question.modelAnswer, userAnswer);

    const answer = await Answer.create({
      user: req.user._id,
      question: question._id,
      session: sessionId,
      userAnswer,
      scores: {
        relevance: evaluation.semantic_similarity,
        sentiment: evaluation.sentiment,
        confidence: evaluation.confidence,
      },
      skillBreakdown: evaluation.skills,
      overallScore: evaluation.overall_score,
    });

    session.answeredQuestions.push({
      question: question._id,
      score: answer.overallScore,
    });
    session.totalScore += answer.overallScore;
    await session.save();
    res.json({
      message: "Answer submitted successfully",
      score: evaluation.finalScore,
    });
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
        message: "Interview not completed yet",
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

export const getFeedback = async (req, res) => {
  try {
    const { sessionId } = req.params;

    const answers = await Answer.find({ session: sessionId });

    if (!answers.length) {
      return res.status(404).json({ message: "No answers found" });
    }

    const total = answers.length;

    const avgTechnical =
      answers.reduce((sum, a) => sum + a.skillBreakdown.technical_knowledge, 0) / total;

    const avgCommunication =
      answers.reduce((sum, a) => sum + a.skillBreakdown.communication, 0) / total;

    const avgConfidence =
      answers.reduce((sum, a) => sum + a.skillBreakdown.confidence, 0) / total;

    const avgProblemSolving =
      answers.reduce((sum, a) => sum + a.skillBreakdown.problem_solving, 0) / total;

    const overall =
      answers.reduce((sum, a) => sum + a.overallScore, 0) / total;

    const strengths = [];
    const improvements = [];

    if (avgTechnical > 80) strengths.push("Strong technical understanding.");
    else improvements.push("Improve depth of technical explanations.");

    if (avgCommunication > 80) strengths.push("Clear and structured communication.");
    else improvements.push("Work on clarity and structure of answers.");

    if (avgConfidence > 80) strengths.push("Confident delivery.");
    else improvements.push("Show more confidence in explanations.");

    if (avgProblemSolving > 80) strengths.push("Good problem-solving approach.");
    else improvements.push("Improve logical reasoning and structured thinking.");

    return res.json({
      sessionId,
      summary: {
        overall: Number(overall.toFixed(2)),
        technical_knowledge: Number(avgTechnical.toFixed(2)),
        communication: Number(avgCommunication.toFixed(2)),
        confidence: Number(avgConfidence.toFixed(2)),
        problem_solving: Number(avgProblemSolving.toFixed(2))
      },
      strengths,
      improvements
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to generate feedback" });
  }
};

export const getUserSessions = async (req, res) => {
  try {
    const sessions = await InterviewSession.find({ user: req.user._id })
      .select(
        "_id role difficulty status totalScore totalQuestions createdAt updatedAt",
      )
      .sort({ createdAt: -1 });

    res.json({ sessions });
  } catch (error) {
    console.error("Error fetching user sessions:", error);
    res.status(500).json({ message: "Error fetching user sessions" });
  }
};
