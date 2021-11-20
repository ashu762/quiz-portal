import expressAsyncHandler from "express-async-handler";
import QuizResponse from "../models/quizResponseModel.js";
import asyncHandler from "express-async-handler";
// @desc Create Quiz
// @route GEt /api/quiz
// @access public
export const postQuizResponse = asyncHandler(async (req, res) => {
  const { name, emailId, userId, quizId, quizResponse } = req.body;
  const quizResponseData = await QuizResponse.create({
    name,
    emailId,
    userId,
    quizId,
    quizResponse,
  });
  if (quizResponseData) {
    res.status(200).json({
      name: quizResponseData.name,
      emailId: quizResponseData.emailId,
      userId: quizResponseData.userId,
      quizId: quizResponseData.quizId,
      quizResponse: quizResponseData.quizResponse,
    });
  } else {
    res.status(400);
    throw new Error("Quiz Response not taken successfully!!");
  }
});
