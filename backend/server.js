import express from "express";
import dotenv from "dotenv";
import path from "path";
import connectDB from "./config/db.js";
import colors from "colors";
import questionRoutes from "./routes/questionRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import quizRoutes from "./routes/quizRoutes.js";
import { errorHandler, notFound } from "./middleware/errorMiddleware.js";

const app = express();
dotenv.config();
app.use(express.json());

connectDB();

app.use("/api/quiz", quizRoutes);

app.use("/api/question", questionRoutes);
app.use("/api/users/", userRoutes);
app.use(errorHandler);
app.use(notFound);

const __dirname = path.resolve();
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
