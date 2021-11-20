import mongoose from "mongoose";

const quizSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    name: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      default: "It is a Quiz",
    },
    // createdAt: {
    //   type: String,
    //   default: Date.now(),
    // },
  },
  { timestamps: true }
);
const Quiz = mongoose.model("Quiz", quizSchema);
export default Quiz;
