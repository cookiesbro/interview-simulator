import express from "express";
import "dotenv/config";
import quizRouter from "../api/quiz/quiz.router";
import cors from "cors";

export const startApi = () => {
  const app = express();
  // Render предоставляет порт через переменную окружения PORT
  const PORT = process.env.PORT || 5001;

  const corsOptions = {
    origin: process.env.WEB_APP_URL,
  };

  app.use(cors(corsOptions));
  app.use(express.json());
  app.use("/api/quiz", quizRouter);

  app.listen(PORT, () => {
    console.log(`API Server is running on port ${PORT}`);
  });
};

startApi();
