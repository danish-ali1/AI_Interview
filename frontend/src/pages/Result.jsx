import { useLocation, useNavigate } from "react-router-dom";

const Result = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  if (!state) {
    navigate("/");
    return null;
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="max-w-md p-6 border rounded text-center">
        <h2 className="text-2xl font-bold mb-4">Interview Completed 🎉</h2>

        <p>Total Questions: {state.summary.totalQuestions}</p>
        <p>Total Score: {state.summary.totalScore}</p>
        <p>Average Score: {state.summary.averageScore}</p>

        <button
          onClick={() => navigate("/")}
          className="mt-6 px-4 py-2 bg-black text-white rounded"
        >
          Go Home
        </button>
      </div>
    </div>
  );
};

export default Result;