import express from "express";
import "dotenv/config";
import quizRouter from "../api/quiz/quiz.router";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 5001;

// Разрешаем CORS с любого источника для локальной разработки
app.use(cors());
app.use(express.json());

app.use("/api/quiz", quizRouter);

app.listen(PORT, () => {
  console.log(`API Server is running on port ${PORT}`);
});
