import express from "express";
const router = express.Router();
import { protect } from "../middleware/authMiddleware.js";
import {
  getQuestions,
  postQuestion,
  getQuestionByUser,
} from "../controllers/questionController.js";

router.route("/").get(protect, getQuestions).post(protect, postQuestion);
router.route("/:id").get(protect, getQuestionByUser);

export default router;
