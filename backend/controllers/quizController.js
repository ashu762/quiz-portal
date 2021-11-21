import expressAsyncHandler from "express-async-handler";
import Quiz from "../models/quizModel.js";
import Question from "../models/questionModel.js";
import asyncHandler from "express-async-handler";
import QuizResponse from "../models/quizResponseModel.js";
import { generateReportHelper } from "../config/generateReportHelper.js";
import { sendMails } from "../config/nodeMailer.js";
// @desc Create Quiz
// @route GEt /api/quiz
// @access public
export const postQuiz = asyncHandler(async (req, res) => {
  const {
    name,
    author,
    user,
    description,
    isPrivate,
    isTimedQuiz,
    startTime,
    endTime,
  } = req.body;

  const createdAt = Date.now();

  const quiz = await Quiz.create({
    name,
    author,
    user,
    description,
    createdAt,
    isPrivate,
    isTimedQuiz,
    startTime,
    endTime,
  });
  if (quiz) {
    res.status(200).json({
      name: quiz.name,
      user: quiz.user,
      author: quiz.author,
      id: quiz._id,
      description: quiz.description,
      createdAt: quiz.createdAt,
      isPrivate: quiz.isPrivate,
    });
  } else {
    res.status(400);
    throw new Error("Quiz Creation unsuccessful");
  }
});

// @desc Get Quiz by id
// @route GEt /api/quiz/:id
// @access public
export const getQuizById = asyncHandler(async (req, res) => {
  const questions = await Question.find({ quizName: req.params.id });
  if (questions) {
    res.status(200).json(questions);
  } else {
    res.status(400);
    throw new Error("Quiz Not found!!");
  }
});

export const getQuizDataById = asyncHandler(async (req, res) => {
  const quiz = await Quiz.findById(req.params.id);
  if (quiz) {
    res.status(200).json(quiz);
  } else {
    res.status(400);
    throw new Error("Quiz Not found!!");
  }
});

// @desc Get All Quiz  by a user
// @route GEt /api/quiz/users/:id
// @access public
export const getQuizByUser = asyncHandler(async (req, res) => {
  const quizzes = await Quiz.find({ user: req.params.id });
  if (quizzes) {
    res.status(200).json(quizzes);
  } else {
    res.status(400);
    throw new Error("Quiz Not found!!");
  }
});

export const getAllQuiz = asyncHandler(async (req, res) => {
  const quizzes = await Quiz.find();
  if (quizzes) {
    res.status(200).json(quizzes);
  } else {
    res.status(400);
    throw new Error("Quiz Not found!!");
  }
});

export const deleteQuiz = asyncHandler(async (req, res) => {
  const id = req.params.id;

  const quiz = await Quiz.findByIdAndDelete(id);
  const question = await Question.deleteMany({ quizName: id });
  if (quiz) {
    res.status(200).json({ success: true });
  } else {
    res.status(400);
    throw new Error("An error occured while deleting the quiz");
  }
});

export const sendEmailsToEveryone = asyncHandler(async (req, res) => {
  const id = req.params.id;

  const quiz = await Quiz.findById(id);

  const questions = await Question.find({ quizName: id });

  const responses = await QuizResponse.find({ quizId: id });

  const generatedReport = generateReportHelper(questions, responses);

  sendMails(generatedReport, quiz?.name);

  if (quiz) {
    res.status(200).json({ success: true });
  } else {
    res.status(400);
    throw new Error("An error occured while sending the mails to everyone");
  }
});

export const sendGeneratedReport = asyncHandler(async (req, res) => {
  const id = req.params.id;

  const quiz = await Quiz.findById(id);

  const questions = await Question.find({ quizName: id });

  const responses = await QuizResponse.find({ quizId: id });

  const generatedReport = generateReportHelper(questions, responses);

  if (quiz) {
    res.status(200).json({ success: true, report: generatedReport });
  } else {
    res.status(400);
    throw new Error("An error occured while genrating the report");
  }
});

export const updateQuiz = asyncHandler(async (req, res) => {
  const { isPrivate } = req.body;
  const quiz = await Quiz.findById(req.params.id);

  quiz.isPrivate = isPrivate;
  if (quiz) {
    const updatedQuiz = await quiz.save();

    res.status(200).json({
      updatedQuiz,
      success: true,
    });
  } else {
    res.status(400);
    throw new Error("Quiz Creation unsuccessful");
  }
});

export const updateTimedQuiz = asyncHandler(async (req, res) => {
  const { isTimedQuiz, startTime, endTime } = req.body;
  const quiz = await Quiz.findById(req.params.id);

  quiz.isTimedQuiz = isTimedQuiz;
  quiz.startTime = startTime;
  quiz.endTime = endTime;
  if (quiz) {
    const updatedQuiz = await quiz.save();

    res.status(200).json({
      updatedQuiz,
      success: true,
    });
  } else {
    res.status(400);
    throw new Error("Quiz Creation unsuccessful");
  }
});
