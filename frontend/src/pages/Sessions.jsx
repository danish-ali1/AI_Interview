import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { axiosInstance } from "../api/axios";

const Sessions = () => {
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSessions = async () => {
      try {
        setLoading(true);
        const res = await axiosInstance.get("/interview/sessions");
        setSessions(res.data.sessions || []);
      } catch (err) {
        setError(err?.response?.data?.message || "Failed to load sessions");
      } finally {
        setLoading(false);
      }
    };

    fetchSessions();
  }, []);

  if (loading) return <div className="p-6">Loading sessions...</div>;
  if (error) return <div className="p-6 text-red-600">{error}</div>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">My Interview Sessions</h1>

      {sessions.length === 0 ? (
        <div className="border p-4 rounded text-center">
          <p>No interview sessions yet.</p>
          <button
            onClick={() => navigate("/interview")}
            className="mt-4 px-4 py-2 bg-green-400 rounded-2xl hover:bg-green-500"
          >
            Start New Interview
          </button>
        </div>
      ) : (
        <div className="grid gap-3">
          {sessions.map((session) => (
            <div key={session._id} className="border p-4 rounded flex justify-between items-center">
              <div>
                <p className="font-semibold">{session.role} - {session.difficulty}</p>
                <p className="text-sm text-gray-600">{session.totalQuestions} questions</p>
                <p className="text-sm text-gray-600">Status: {session.status}</p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => navigate(`/feedback/${session._id}`)}
                  className="px-4 py-2 bg-blue-400 rounded-2xl hover:bg-blue-500"
                >
                  View Feedback
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Sessions;