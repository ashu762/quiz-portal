import express from "express";
import asyncHandler from "express-async-handler";

const router = express.Router();

const multer = require("multer");
const upload = multer({ dest: __dirname + "/uploads/images" });

export const uploadPhotos = asyncHandler(async (req, res) => {
  res.status(200).json({ message: "Asdsa" });
});

router.post("/", uploadPhotos);

export default router;
