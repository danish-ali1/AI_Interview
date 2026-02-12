import mongoose from "mongoose";

const answerSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    question: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Question",
      required: true,
    },

    session: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "InterviewSession",
    },

    userAnswer: {
      type: String,
      required: true,
      trim: true,
    },

    scores: {
      relevance: Number,
      sentiment: String,
      confidence: Number,
    },
    skillBreakdown: {
      technical_knowledge: Number,
      communication: Number,
      confidence: Number,
      problem_solving: Number,
    },
    overallScore: {
      type: Number,
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model("Answer", answerSchema);
