import mongoose from "mongoose";

const answerSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    question: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Question",
      required: true
    },

    userAnswer: {
      type: String,
      required: true,
      trim: true
    },

    scores: {
      relevance: {
        type: Number,
        min: 0,
        max: 100
      },
      sentiment: {
        type: Number,
        min: -1,
        max: 1
      },
      confidence: {
        type: Number,
        min: 0,
        max: 100
      }
    },

    feedback: {
      type: String
    }
  },
  {
    timestamps: true
  }
);

export default mongoose.model("Answer", answerSchema);
