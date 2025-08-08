import type { Request, Response } from 'express'; // Импортируем типы для запроса и ответа
import questions from '../../data/questions.json'; // Импортируем наши данные
import type { IQuestion } from './question.types'; // Импортируем наш тип

export const getRandomQuestion = (req: Request, res: Response) => {
  // Мы явно указываем, что наш массив questions
  // состоит из объектов типа IQuestion
  const typedQuestions: IQuestion[] = questions;

  const randomIndex = Math.floor(Math.random() * typedQuestions.length);
  const randomQuestion = typedQuestions[randomIndex];

  res.json(randomQuestion); // Отправляем случайный вопрос в формате JSON
};

// Controller отвечает за логику обработки запроса