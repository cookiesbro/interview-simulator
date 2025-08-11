import express from "express";
import "dotenv/config"; // переменные из .env файла
import quizRouter from "../api/quiz/quiz.router";
import cors from "cors"; // Импорт cors

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(cors()); // Включили CORS, чтобы клиент мог делать запросы
app.use(express.json()); // Для парсинга JSON-тел запросов

// Routes
app.use("/api/quiz", quizRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
// Создали сервер на Express, который слушает порт из переменных окружения или 5001 по умолчанию.
