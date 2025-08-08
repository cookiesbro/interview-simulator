import type { Request, Response } from "express";
import { randomUUID } from "crypto"; // Встроенный в Node.js генератор UUID
import questions from "../../data/questions.json";
import type { IQuestion } from "../question/question.types";
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

// POST /api/quiz/:sessionId/next
export const getNextQuestion = (req: Request, res: Response) => {
  const { sessionId } = req.params;
  const session = getSession(sessionId);

  if (!session) {
    return res.status(404).json({ message: "Сессия не найдена" });
  }

  // Фильтруем вопросы, которые еще не были показаны в этой сессии
  const availableQuestions = allQuestions.filter(
    (q) => !session.seenQuestionIds.has(q.id)
  );

  if (availableQuestions.length === 0) {
    return res
      .status(200)
      .json({ message: "Все вопросы пройдены!", question: null });
  }

  const nextQuestion =
    availableQuestions[Math.floor(Math.random() * availableQuestions.length)];
  session.seenQuestionIds.add(nextQuestion.id);
  updateSession(sessionId, { seenQuestionIds: session.seenQuestionIds });

  res.json({ question: nextQuestion });
};
