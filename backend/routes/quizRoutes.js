import express from "express";
const router = express.Router();
import { protect } from "../middleware/authMiddleware.js";
import {
  postQuiz,
  getQuizById,
  getQuizByUser,
  getAllQuiz,
} from "../controllers/quizController.js";
router.route("/").post(protect, postQuiz);
router.get("/", getAllQuiz);
router.get("/:id", getQuizById);
router.get("/users/:id", getQuizByUser);
export default router;
