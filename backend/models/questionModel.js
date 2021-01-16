import mongoose from "mongoose";
const questionModel = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  quizName: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Quiz",
  },
  question: {
    type: String,
    required: true,
  },
  options: {
    type: Array,
    required: true,
  },
  // 0 based
  correctOption: {
    type: Number,
    required: true,
  },
});

const Question = mongoose.model("Question", questionModel);
export default Question;
