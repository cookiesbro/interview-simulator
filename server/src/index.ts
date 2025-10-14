import express from "express";
import "dotenv/config";
import quizRouter from "./api/quiz/quiz.router";
import cors from "cors";
import { startBot } from "./core/bot";

const app = express();
const PORT = process.env.PORT || 5001;

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || origin.endsWith(".vercel.app")) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
};

app.use(cors(corsOptions));
app.use(express.json());
app.use("/api/quiz", quizRouter);

app.listen(PORT, () => {
  console.log(`API Server is running on port ${PORT}`);
  // Запускаем бота только ПОСЛЕ того, как API-сервер начал слушать порт
  startBot();
});
