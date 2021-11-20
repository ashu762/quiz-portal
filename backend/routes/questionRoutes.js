import express from "express";
const router = express.Router();
import { protect } from "../middleware/authMiddleware.js";
import {
  getQuestions,
  postQuestion,
  getQuestionByUser,
  updateQuestion,
  deleteQuestion,
} from "../controllers/questionController.js";

router.route("/").get(protect, getQuestions).post(protect, postQuestion);
router.route("/:id").get(protect, getQuestionByUser);
router.route("/update/:id").post(protect, updateQuestion);
router.route("/delete/:id").get(protect, deleteQuestion);

export default router;
