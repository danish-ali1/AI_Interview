import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getInterviewFeedback } from "../services/interview.service";

const Feedback = () => {
  const { sessionId } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [feedback, setFeedback] = useState(null);

  useEffect(() => {
    if (!sessionId) return navigate("/");

    const load = async () => {
      try {
        setLoading(true);
        const res = await getInterviewFeedback(sessionId);
        setFeedback(res);
      } catch (err) {
        setError(err?.response?.data?.message || "Failed to load feedback");
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [sessionId, navigate]);

  if (loading) return <div className="p-6">Loading feedback...</div>;
  if (error) return <div className="p-6 text-red-600">{error}</div>;
  if (!feedback) return <div className="p-6">No feedback available</div>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Interview Feedback</h1>

      <div className="border p-4 rounded mb-4">
        <p><strong>Session:</strong> {feedback.sessionId}</p>
        <p><strong>Status:</strong> {feedback.status}</p>
        <p><strong>Total Questions:</strong> {feedback.totalQuestions}</p>
        <p><strong>Total Score:</strong> {feedback.totalScore}</p>
        <p><strong>Average Score:</strong> {feedback.averageScore}</p>
      </div>

      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Recommendations</h2>
        <ul className="list-disc pl-6">
          {feedback.recommendations && feedback.recommendations.length > 0 ? (
            feedback.recommendations.map((r, i) => <li key={i}>{r}</li>)
          ) : (
            <li>No recommendations</li>
          )}
        </ul>
      </div>

      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Strengths</h2>
        <div className="flex gap-4">
          {feedback.strengths && feedback.strengths.length > 0 ? (
            feedback.strengths.map((s) => (
              <div key={s.questionId} className="border p-3 rounded">
                <p className="text-sm">Question: {s.questionId}</p>
                <p className="font-bold">Score: {s.score}</p>
              </div>
            ))
          ) : (
            <div>No strengths identified</div>
          )}
        </div>
      </div>

      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Weaknesses</h2>
        <div className="flex gap-4">
          {feedback.weaknesses && feedback.weaknesses.length > 0 ? (
            feedback.weaknesses.map((w) => (
              <div key={w.questionId} className="border p-3 rounded">
                <p className="text-sm">Question: {w.questionId}</p>
                <p className="font-bold">Score: {w.score}</p>
              </div>
            ))
          ) : (
            <div>No weaknesses identified</div>
          )}
        </div>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-2">Questions & Feedback</h2>
        {feedback.questions && feedback.questions.length > 0 ? (
          feedback.questions.map((q) => (
            <div key={q.questionId} className="border p-4 rounded mb-3">
              <p className="font-medium">{q.questionText || `Question ${q.questionId}`}</p>
              <p className="text-sm mt-1"><strong>Your answer:</strong> {q.userAnswer}</p>
              <div className="mt-2 flex gap-4 text-sm">
                <div><strong>Relevance:</strong> {q.relevance ?? "-"}</div>
                <div><strong>Completeness:</strong> {q.completeness ?? "-"}</div>
                <div><strong>Sentiment:</strong> {q.sentiment ?? "-"}</div>
                <div><strong>Score:</strong> {q.finalScore ?? "-"}</div>
              </div>
              {q.suggestions && q.suggestions.length > 0 && (
                <ul className="list-disc pl-6 mt-2 text-sm">
                  {q.suggestions.map((s, i) => <li key={i}>{s}</li>)}
                </ul>
              )}
            </div>
          ))
        ) : (
          <div>No per-question feedback available</div>
        )}
      </div>
    </div>
  );
};

export default Feedback;