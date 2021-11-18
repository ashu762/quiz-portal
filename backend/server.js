import express from "express";
import dotenv from "dotenv";
import path from "path";
import connectDB from "./config/db.js";

import { sendMail } from "./config/nodeMailer.js";

import colors from "colors";
import questionRoutes from "./routes/questionRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import quizRoutes from "./routes/quizRoutes.js";
import quizResponseRoutes from "./routes/quizResponseRoutes.js";
// import uploadRoutes from "./routes/uploadRoutes.js";
import { errorHandler, notFound } from "./middleware/errorMiddleware.js";

const app = express();
dotenv.config();
app.use(express.json());
const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, "public")));

import multer from "multer";

const DIR = "./public/";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, DIR);
  },
  filename: (req, file, cb) => {
    const fileName = file.originalname.toLowerCase().split(" ").join("-");
    cb(null, "Asdsafasf" + "-" + fileName);
  },
});

var upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    cb(null, true);
  },
});

app.post("/api/upload", upload.array("imagesArray", 8), (req, res) => {
  const reqFiles = [];

  const url = req.protocol + "://" + req.get("host");

  for (var i = 0; i < req.files.length; i++) {
    reqFiles.push(url + "/" + req.files[i].filename);
  }

  res.json(reqFiles);
});

connectDB();

// sendMail("Hello world", "this is email body it can contain html also");

app.use("/api/quiz", quizRoutes);

app.use("/api/question", questionRoutes);
app.use("/api/users/", userRoutes);
app.use("/api/quiz-response", quizResponseRoutes);
// app.use("/api/upload", uploadRoutes);
app.use(errorHandler);
// app.use(notFound);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/quizmaker/build")));
  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "quizmaker", "build", "index.html"))
  );
} else {
  app.get("/", (req, res) => {
    res.send("API IS RUNNING");
  });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log("SERVER STARTED"));
