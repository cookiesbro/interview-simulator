import type { Request, Response } from "express";
import { randomUUID } from "crypto"; // Встроенный в Node.js генератор UUID
import questions from "../../data/questions.json";
import type { IQuestion } from "./quiz.types";
import { createSession, getSession, updateSession } from "./quiz.store";

const allQuestions: IQuestion[] = questions;

// POST /api/quiz/start
export const startQuiz = (req: Request, res: Response) => {
  const sessionId = randomUUID();
  const session = createSession(sessionId);

  const availableQuestions = allQuestions.filter(
    (q) => !session.seenQuestionIds.has(q.id)
  );

  if (availableQuestions.length === 0) {
    return res.status(404).json({ message: "Нет доступных вопросов" });
  }

  const randomQuestion =
    availableQuestions[Math.floor(Math.random() * availableQuestions.length)];

  // Добавляем ID вопроса в "увиденные"
  session.seenQuestionIds.add(randomQuestion.id);
  updateSession(sessionId, { seenQuestionIds: session.seenQuestionIds });

  res.status(201).json({ sessionId, question: randomQuestion });
};

// НОВЫЙ ЭНДПОИНТ: POST /api/quiz/:sessionId/answer
export const submitAnswer = (req: Request, res: Response) => {
  // 1. Валидация
  const { sessionId } = req.params;
  const { questionId, answer } = req.body; // Получаем ID вопроса и ответ от клиента

  if (!questionId || !answer) {
    return res.status(400).json({ message: "questionId и answer обязательны" });
  }

  const session = getSession(sessionId);
  if (!session) {
    return res.status(404).json({ message: "Сессия не найдена" });
  }

  // 2. Находим вопрос, на который отвечали
  const answeredQuestion = allQuestions.find((q) => q.id === questionId);
  if (!answeredQuestion) {
    return res.status(404).json({ message: "Вопрос не найден" });
  }

  // 3. Проверяем правильность ответа
  const isCorrect = answeredQuestion.correctAnswer === answer;
  if (isCorrect) {
    session.score += 1; // Увеличиваем счет
  }

  // 4. Находим следующий уникальный вопрос
  const availableQuestions = allQuestions.filter(
    (q) => !session.seenQuestionIds.has(q.id)
  );
  const nextQuestion =
    availableQuestions.length > 0
      ? availableQuestions[
          Math.floor(Math.random() * availableQuestions.length)
        ]
      : null;

  if (nextQuestion) {
    session.seenQuestionIds.add(nextQuestion.id);
  }

  updateSession(sessionId, session);

  // 5. Отправляем развернутый ответ клиенту
  res.json({
    isCorrect,
    correctAnswer: answeredQuestion.correctAnswer,
    score: session.score,
    nextQuestion: nextQuestion,
  });
};
