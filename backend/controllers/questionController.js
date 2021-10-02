import asyncHandler from "express-async-handler";
import Question from "../models/questionModel.js";

// @desc Fetch all Question
// @route GEt /api/question
// @access public

export const getQuestions = asyncHandler(async (req, res) => {
  const questions = await Question.find({});
  res.json(questions);
});

// @desc Post a Question
// @route POST /api/question
// @access public
export const postQuestion = asyncHandler(async (req, res) => {
  const { question, options, correctOption, user, quizName, hint } = req.body;
  const ques = await Question.create({
    question,
    options,
    correctOption,
    user,
    quizName,
    hint,
  });
  if (ques) {
    res.status(201).json({
      name: ques?.question,
      options: ques?.options,
      correctOption: ques?.correctOption,
      user: ques?.user,
      quizName: ques?.quizName,
      hint: ques?.hint,
    });
  } else {
    res.status(400);
    throw new Error("Invalid Data");
  }
});

// @desc Get question by user
// @route GET /api/questions/:id
// Route public

export const getQuestionByUser = asyncHandler(async (req, res) => {
  const questions = await Question.find({ user: req.params.id });
  console.log(questions);
  if (questions) {
    res.status(201).json({
      questions,
    });
  } else {
    res.status(401);
    throw new Error("Invalid request or no question found!");
  }
});
