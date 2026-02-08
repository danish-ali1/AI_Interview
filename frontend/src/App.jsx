import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Interview from "./pages/Interview";
import Home from "./pages/Home";
import Result from "./pages/Result";
import Feedback from "./pages/Feedback";
import Sessions from "./pages/Sessions";
import ProtectedRoute from "./routes/ProtectedRoute";
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
      </Routes>
    </>
  );
};

export default App;