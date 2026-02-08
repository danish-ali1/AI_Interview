import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { isAuthenticated } from "../services/auth.service";
import toast from "react-hot-toast";
import { logout } from "../services/auth.service";

const Navbar = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      const authUser = await isAuthenticated();
      setUser(authUser);
    };
    checkAuth();
  }, []);

  const handleLogout = async () => {
    await logout();
    toast.success("Logged out");
    setUser(null);
    navigate("/login");
  };

  return (
    <nav className="sticky top-0 border-b px-6 py-4 flex justify-between bg-gray-500">
      <Link to="/" className="font-bold">AI Interview</Link>

      <div className="flex gap-4">
        {!user ? (
          <>
            <Link to="/login" className="text-sm border  bg-blue-300 rounded-2xl p-2 hover:bg-blue-400 cursor-pointer">Login</Link>
            <Link to="/signup" className="text-sm border  bg-blue-300 rounded-2xl p-2 hover:bg-blue-400 cursor-pointer">Signup</Link>
          </>
        ) : (
          <>
            <div className="text-sm border  bg-gray-300 rounded-2xl p-2">Hi {user.name}</div>
            <Link to="/interview" className="text-sm border  bg-blue-300 rounded-2xl p-2 hover:bg-blue-400">Interview</Link>
            <Link to="/sessions" className="text-sm border  bg-blue-300 rounded-2xl p-2 hover:bg-blue-400">Sessions</Link>
            <button onClick={handleLogout} className="text-sm border  bg-blue-300 rounded-2xl p-2 hover:bg-blue-400 cursor-pointer">Logout</button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;