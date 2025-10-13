import express from "express";
import "dotenv/config";
import quizRouter from './api/quiz/quiz.router';
import cors from "cors";
import { startBot } from './core/bot';

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors({ origin: process.env.WEB_APP_URL }));
app.use(express.json());
app.use('/api/quiz', quizRouter);

app.listen(PORT, () => {
  console.log(`API Server is running on port ${PORT}`);
  // Запускаем бота только ПОСЛЕ того, как API-сервер начал слушать порт
  startBot(); 
});