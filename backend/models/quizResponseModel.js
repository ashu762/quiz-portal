import mongoose from "mongoose";

const quizResponseSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    name: {
      type: String,
      required: true,
    },
    emailId: {
      type: String,
      required: true,
    },
    quizId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Quiz",
    },
    quizResponse: {
      type: Object,
      required: true,
    },
    // createdAt: {
    //   type: String,
    //   default: Date.now(),
    // },
  },
  { timestamps: true }
);
const QuizResponse = mongoose.model("QuizResponse", quizResponseSchema);
export default QuizResponse;
