import { useState } from "react";
import { axiosInstance } from "../api/axios";
import toast from "react-hot-toast";

const AddQuestion = () => {
  const [role, setRole] = useState("");
  const [difficulty, setDifficulty] = useState("easy");
  const [questionText, setQuestionText] = useState("");
  const [modelAnswer, setModelAnswer] = useState("");
  const [keywords, setKeywords] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axiosInstance.post("/admin/addQuestions", {
        role,
        difficulty,
        questionText,
        modelAnswer,
        keywords: keywords.split(",").map(k => k.trim())
      });
      toast.success("Question added successfully");
      setRole("");
      setDifficulty("easy");
      setQuestionText("");
      setModelAnswer("");
      setKeywords("");
     } catch (error) {
      console.error(error);
      toast.error("Failed to add question");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-2xl mx-auto bg-white shadow rounded-xl p-8">
        <h1 className="text-2xl font-bold mb-6">
          Add New Question and Model Answer
        </h1>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Role
            </label>
            <select
              className="w-full mt-2 p-3 border rounded-lg focus:ring-2 focus:ring-blue-400"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              required
            >
              <option value="">Select a role</option>
              <option value="frontend">Frontend</option>
              <option value="backend">Backend</option>
              <option value="fullstack">Full Stack</option>
              <option value="data-analyst">Data Analyst</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Difficulty
            </label>
            <select
              className="w-full mt-2 p-3 border rounded-lg focus:ring-2 focus:ring-blue-400"
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value)}
              required
            >
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Question
            </label>
            <textarea
              className="w-full mt-2 p-3 border rounded-lg focus:ring-2 focus:ring-blue-400"
              rows="3"
              value={questionText}
              onChange={(e) => setQuestionText(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Model Answer
            </label>
            <textarea
              className="w-full mt-2 p-3 border rounded-lg focus:ring-2 focus:ring-blue-400"
              rows="5"
              value={modelAnswer}
              onChange={(e) => setModelAnswer(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Keywords (comma separated)
            </label>
            <input
              type="text"
              className="w-full mt-2 p-3 border rounded-lg focus:ring-2 focus:ring-blue-400"
              value={keywords}
              onChange={(e) => setKeywords(e.target.value)}
              placeholder="OOP, encapsulation, inheritance"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition"
          >
            Add 
          </button>

        </form>
      </div>
    </div>
  );
};

export default AddQuestion;
