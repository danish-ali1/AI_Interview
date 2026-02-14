import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Interview from "./pages/Interview";
import Home from "./pages/Home";
import Result from "./pages/Result";
import Feedback from "./pages/Feedback";
import Sessions from "./pages/Sessions";
import AdminDashboard from "./pages/AdminDashboard";
import ProtectedRoute from "./routes/ProtectedRoute";
import AddQuestion from "./pages/AddQuestion";
import { Toaster } from "react-hot-toast";

const App = () => {
  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/interview" element={<ProtectedRoute><Interview /></ProtectedRoute>} />
        <Route path="/result/:sessionId" element={<ProtectedRoute><Result /></ProtectedRoute>} />
        <Route path="/feedback/:sessionId" element={<ProtectedRoute><Feedback /></ProtectedRoute>} />
        <Route path="/sessions" element={<ProtectedRoute><Sessions /></ProtectedRoute>} />
        <Route path="/admin" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
        <Route path="/add-question" element={<ProtectedRoute><AddQuestion /></ProtectedRoute>} />
      </Routes>
    </>
  );
};

export default App;