import express from "express";
const router = express.Router();

import {
  getQuestions,
  postQuestion,
  getQuestionByUser,
} from "../controllers/questionController.js";

router.get("/", getQuestions).post("/", postQuestion);
router.get("/:id", getQuestionByUser);

export default router;
