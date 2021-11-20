import express from "express";
const router = express.Router();
import { protect } from "../middleware/authMiddleware.js";
import { postQuizResponse } from "../controllers/quizResponseController.js";

router.route("/").post(protect, postQuizResponse);

export default router;
