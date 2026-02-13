import User from "../models/User.js";
import InterviewSession from "../models/Interview.js";

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch users" });
  }
};


export const getAllSessions = async (req, res) => {
  try {
    const sessions = await InterviewSession
      .find()
      .populate("user", "name email");
    res.json(sessions);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch sessions" });
  }
};

