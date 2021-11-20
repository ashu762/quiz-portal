import express from "express";
const router = express.Router();
import { protect } from "../middleware/authMiddleware.js";
import {
  postQuiz,
  getQuizById,
  getQuizByUser,
  getAllQuiz,
  deleteQuiz,
  sendGeneratedReport,
  sendEmailsToEveryone,
  updateQuiz,
} from "../controllers/quizController.js";

router.route("/").post(protect, postQuiz).get(protect, getAllQuiz);
router.route("/:id").get(protect, getQuizById);
router.route("/users/:id").get(protect, getQuizByUser);
router.route("/delete/:id").get(protect, deleteQuiz);
router.route("/report/:id").get(protect, sendGeneratedReport);
router.route("/send/:id").get(protect, sendEmailsToEveryone);
router.route("/update/:id").post(protect, updateQuiz);

export default router;
