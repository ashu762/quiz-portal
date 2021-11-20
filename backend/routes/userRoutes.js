import express from "express";
import {
  getUser,
  registerUser,
  authUser,
} from "../controllers/userController.js";
import { protect } from "../middleware/authMiddleware.js";
const router = express.Router();

router.route("/:id").get(protect, getUser);
router.post("/", registerUser);
router.post("/login", authUser);

export default router;
