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
    isPrivate: {
      type: Boolean,
      default: false,
    },
    isTimedQuiz: {
      type: Boolean,
      default: false,
    },
    startTime: {
      type: Date,
      default: new Date(0),
    },
    endTime: {
      type: Date,
      default: new Date(8640000000000000),
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
