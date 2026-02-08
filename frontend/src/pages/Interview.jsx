import { use, useEffect, useState } from "react";
import {
  startInterview,
  submitAnswer,
  getNextQuestion,
  endInterview
} from "../services/interview.service";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Interview = () => {
  const [sessionId, setSessionId] = useState(null);
  const [question, setQuestion] = useState(null);
  const [answer, setAnswer] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [role, setRole] = useState("backend");
  const [difficulty, setDifficulty] = useState("easy");
  const navigate = useNavigate();

  const startInterviewSession = async () => {
    if (!role || !difficulty) {
      setError("Please select both role and difficulty");
      return;
    }
    try {
      setError("");
      setLoading(true);
      const res = await startInterview({
        role: role,
        difficulty: difficulty,
      });
      setSessionId(res.sessionId);
      // Fetch the first question after session starts
      await fetchNextQuestion(res.sessionId);
    } catch (err) {
      setError(err?.response?.data?.message || "Failed to start interview");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const submitAnswerHandler = async () => {
    if (!answer.trim()) return;

    try {
      setLoading(true);

      const res = await submitAnswer(sessionId, {
        questionId: question._id,
        userAnswer: answer,
      });

      setAnswer("");
      // fetch next question for this session explicitly
      await fetchNextQuestion(sessionId);
      setError("");
    } catch (err) {
      console.error("submitAnswer error:", err);
      setError(err?.response?.data?.message || err?.message || "Failed to submit answer");
    } finally {
      setLoading(false);
    }
  };

  const fetchNextQuestion = async (sid = sessionId) => {
    try {
      const res = await getNextQuestion(sid);
      // Backend returns { message: 'Interview completed !!!' } when done
      if (res.message && /completed/i.test(res.message)) {
        const summary=await endInterview(sid)
        toast.success("Interview completed!");
        navigate(`/result/${sid}`, {state: {summary}});
        setQuestion(null);
      } else if (res.questionId && res.questionText) {
        // Backend returns { questionId, questionText }
        setQuestion({ _id: res.questionId, questionText: res.questionText });
      } else {
        setError("Failed to load question");
      }
    } catch (err) {
      setError(err?.response?.data?.message || "Failed to load next question");
    }
  };

  return (
     

    <div className="max-w-3xl mx-auto mt-10 p-6 ">
      <div className="space-y-4 max-w-sm">
        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="w-full border p-2 rounded"
        >
          <option value="">Select Role</option>
          <option value="frontend">Frontend</option>
          <option value="backend">Backend</option>
          <option value="fullstack">FullStack</option>
          <option value="data_analyst">Data Analyst</option>
        </select>
        <select
          value={difficulty}
          onChange={(e) => setDifficulty(e.target.value)}
          className="w-full border p-2 rounded"
        >
          <option value="">Select Difficulty</option>
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>
      </div>

      <h1 className="text-2xl font-bold mt-3 mb-4">Interview Session</h1>

      {error && <p className="text-red-500">{error}</p>}

      {!sessionId && (
        <button
          className="px-4 py-2 disabled:opacity-50 text-sm border  bg-green-400 rounded-2xl p-2 hover:bg-green-500 cursor-pointer"
          onClick={startInterviewSession}
          disabled={loading}
        >
          {loading ? "Starting..." : "Start Interview"}
        </button>
      )}

      {question && (
        <div className="mt-6">
          <h2 className="text-lg font-semibold mb-3">
            {question.questionText}
          </h2>

          <textarea
            className="w-full border p-3 rounded"
            rows="5"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            required
          />

          <button
            className="mt-4 px-4 py-2 text-sm border  bg-green-400 rounded-2xl hover:bg-green-500 cursor-pointer"
            onClick={submitAnswerHandler}
            disabled={loading}
          >
            Submit Answer
          </button>
        </div>
      )}
    </div>
  );
};

export default Interview;