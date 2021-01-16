import express from "express";
import {
  getUser,
  registerUser,
  authUser,
} from "../controllers/userController.js";
const router = express.Router();

router.get("/:id", getUser);
router.post("/", registerUser);
router.post("/login", authUser);

export default router;
