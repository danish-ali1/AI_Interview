import User from "../models/User.js";
import Question from "../models/Question.js";
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

export const addQuestion = async (req, res) => {
  try {
    const {role,difficulty,questionText,modelAnswer,keywords} = req.body;

    if (!role || !difficulty || !questionText || !modelAnswer) {
      return res.status(400).json({message: "All required fields must be provided"});
    }
    const question = await Question.create({role,difficulty,questionText,modelAnswer,keywords: keywords || []});
    res.status(201).json({message: "Question added successfully",question});
    } catch (error) {
    console.error("Add question error:", error);
    res.status(500).json({message: "Failed to add question", error: error.message});
  }
};


