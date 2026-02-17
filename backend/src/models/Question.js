import mongoose from "mongoose";

const questionSchema = new mongoose.Schema(
  {
    role: {
      type: String,
      enum: ["frontend", "backend", "fullstack", "dataanalyst"],
      required: true,
    },
    difficulty: {
      type: String,
      enum: ["easy", "medium", "hard"],
      required: true,
    },
    questionText: {
      type: String,
      required: true,
      trim: true,
    },
    modelAnswer: {
      type: String,
      required: true,
    },
    keywords: {
      type: [String],
      default: [],
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model("Question", questionSchema);
