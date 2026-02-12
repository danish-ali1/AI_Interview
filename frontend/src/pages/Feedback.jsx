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
      <h1 className="text-2xl font-bold mb-6">Interview Feedback</h1>

      <div className="bg-blue-50 border border-blue-200 p-6 rounded mb-6">
        <h2 className="text-xl font-semibold mb-4">Performance Summary</h2>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
          <div>
            <p className="text-gray-600 text-sm">Overall Score</p>
            <p className="text-3xl font-bold text-blue-600">{feedback.summary?.overall ?? "-"}</p>
          </div>
          <div>
            <p className="text-gray-600 text-sm">Technical Knowledge</p>
            <p className="text-2xl font-bold">{feedback.summary?.technical_knowledge ?? "-"}</p>
          </div>
          <div>
            <p className="text-gray-600 text-sm">Communication</p>
            <p className="text-2xl font-bold">{feedback.summary?.communication ?? "-"}</p>
          </div>
          <div>
            <p className="text-gray-600 text-sm">Confidence</p>
            <p className="text-2xl font-bold">{feedback.summary?.confidence ?? "-"}</p>
          </div>
          <div>
            <p className="text-gray-600 text-sm">Problem Solving</p>
            <p className="text-2xl font-bold">{feedback.summary?.problem_solving ?? "-"}</p>
          </div>
        </div>
      </div>

      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-3">Your Strengths</h2>
        <div className="bg-green-50 border border-green-200 rounded p-4">
          {feedback.strengths && feedback.strengths.length > 0 ? (
            <ul className="list-disc pl-6 space-y-2">
              {feedback.strengths.map((s, i) => (
                <li key={i} className="text-gray-700">{s}</li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">No strengths identified</p>
          )}
        </div>
      </div>

      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-3">Areas for Improvement</h2>
        <div className="bg-yellow-50 border border-yellow-200 rounded p-4">
          {feedback.improvements && feedback.improvements.length > 0 ? (
            <ul className="list-disc pl-6 space-y-2">
              {feedback.improvements.map((i, idx) => (
                <li key={idx} className="text-gray-700">{i}</li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">No areas for improvement identified</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Feedback;