import express from "express";
import dotenv from "dotenv";
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
app.get("/", (req, res) => {
  res.send("API IS RUNNING");
});
app.use("/api/quiz", quizRoutes);

app.use("/api/question", questionRoutes);
app.use("/api/users/", userRoutes);
app.use(errorHandler);
app.use(notFound);

const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log("SERVER STARTED"));
