import express from "express";
const router = express.Router();
import { protect } from "../middleware/authMiddleware.js";
import {
  postQuiz,
  getQuizById,
  getQuizByUser,
  getAllQuiz,
} from "../controllers/quizController.js";
router.route("/").post(protect, postQuiz).get(protect, getAllQuiz);
router.route("/:id").get(protect, getQuizById);
router.route("/users/:id").get(protect, getQuizByUser);
export default router;
