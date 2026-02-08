import mongoose from "mongoose";

const interviewSessionSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    role: {
      type: String,
      required: true
    },

    difficulty: {
      type: String,
      enum: ["easy", "medium", "hard"],
      required: true
    },

    answeredQuestions: [
      {
        question: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Question"
        },
        score: {
          type: Number,
          default: 0
        }
      }
    ],

    totalScore: {
      type: Number,
      default: 0
    },

    status: {
      type: String,
      enum: ["ongoing", "completed"],
      default: "ongoing"
    }
  },
  { timestamps: true }
);

export default mongoose.model("InterviewSession", interviewSessionSchema);
