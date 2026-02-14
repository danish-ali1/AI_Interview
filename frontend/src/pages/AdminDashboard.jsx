import { useEffect, useState } from "react";
import { axiosInstance } from "../api/axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { isAuthenticated } from "../services/auth.service";

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [sessions, setSessions] = useState([]);

  useEffect(() => {
    const init = async () => {
      const user = await isAuthenticated();
      if (!user || user.role !== "admin") {
        toast.error("Only admin is authorized");
        navigate("/", { replace: true });
        return;
      }
      fetchAdminData();
    };

    init();
  }, []);

  const navigate = useNavigate();

  const [showUsers, setShowUsers] = useState(false);
  const [showSessions, setShowSessions] = useState(false);

  const fetchAdminData = async () => {
    try {
      const usersRes = await axiosInstance.get("/admin/users");
      const sessionsRes = await axiosInstance.get("/admin/sessions");

      setUsers(usersRes.data);
      setSessions(sessionsRes.data);
    } catch (error) {
      console.error("Admin fetch error:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      
      <h1 className="text-3xl font-bold text-gray-800 mb-8">
        Admin Dashboard
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
        
        <div
          onClick={() => setShowUsers((v) => !v)}
          className="bg-white rounded-xl shadow p-6 cursor-pointer hover:shadow-md transition"
        >
          <h3 className="text-gray-500 text-sm">Total Users</h3>
          <p className="text-2xl font-semibold text-gray-800 mt-2">{users.length}</p>
          <p className="text-sm text-gray-400 mt-2">Click to view full user details</p>
        </div>

        <div
          onClick={() => setShowSessions((v) => !v)}
          className="bg-white rounded-xl shadow p-6 cursor-pointer hover:shadow-md transition"
        >
          <h3 className="text-gray-500 text-sm">Total Sessions</h3>
          <p className="text-2xl font-semibold text-gray-800 mt-2">{sessions.length}</p>
          <p className="text-sm text-gray-400 mt-2">Click to view all sessions</p>
        </div>

        <div className="bg-white rounded-xl shadow p-6">
          <h3 className="text-gray-500 text-sm">System Status</h3>
          <p className="text-2xl font-semibold text-green-600 mt-2">
            Active
          </p>
        </div>

        <div className="bg-white rounded-xl shadow p-6 flex flex-col justify-center items-center">
          <h3 className="text-gray-500 text-sm mb-4">Add Questions</h3>
          <button
            onClick={() => navigate("/add-question")}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Go to Add Question
          </button>
        </div>

      </div>

      {showUsers && (
        <div className="bg-white rounded-xl shadow p-6 mb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Users</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b">
                  <th className="py-3 text-sm font-medium text-gray-500">Name</th>
                  <th className="py-3 text-sm font-medium text-gray-500">Email</th>
                  <th className="py-3 text-sm font-medium text-gray-500">Role</th>
                  <th className="py-3 text-sm font-medium text-gray-500">Created</th>
                </tr>
              </thead>
              <tbody>
                {users.map((u) => (
                  <tr key={u._id} className="border-b hover:bg-gray-50 transition">
                    <td className="py-3 text-gray-700">{u.name}</td>
                    <td className="py-3 text-gray-700">{u.email}</td>
                    <td className="py-3 text-gray-700">{u.role}</td>
                    <td className="py-3 text-gray-600">{new Date(u.createdAt).toLocaleString()}</td>
                  </tr>
                ))}

                {users.length === 0 && (
                  <tr>
                    <td colSpan="4" className="py-6 text-center text-gray-500">No users found.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {showSessions && (
        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Interview Sessions</h2>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b">
                  <th className="py-3 text-sm font-medium text-gray-500">Candidate</th>
                  <th className="py-3 text-sm font-medium text-gray-500">Status</th>
                  <th className="py-3 text-sm font-medium text-gray-500">Created At</th>
                  <th className="py-3 text-sm font-medium text-gray-500">Score</th>
                </tr>
              </thead>

              <tbody>
                {sessions.map((session) => (
                  <tr key={session._id} className="border-b hover:bg-gray-50 transition">
                    <td className="py-3 text-gray-700">{session.user?.name}</td>
                    <td className="py-3">
                      <span className="px-3 py-1 text-xs rounded-full bg-blue-100 text-blue-600">{session.status}</span>
                    </td>
                    <td className="py-3 text-gray-600">{new Date(session.createdAt).toLocaleString()}</td>
                    <td className="py-3 text-gray-700">{session.totalScore ?? "-"}</td>
                  </tr>
                ))}

                {sessions.length === 0 && (
                  <tr>
                    <td colSpan="4" className="py-6 text-center text-gray-500">No sessions found.</td>
                  </tr>
                )}

              </tbody>
            </table>
          </div>
        </div>
      )}

    </div>
  );
};

export default AdminDashboard;