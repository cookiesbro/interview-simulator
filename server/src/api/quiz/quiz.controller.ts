import type { Request, Response } from "express";
import { randomUUID } from "crypto";
import languageQuestions from "../../data/language_questions.json";
import historyQuestions from "../../data/history_questions.json";
import lawQuestions from "../../data/law_questions.json";
import type { IQuestion } from "./quiz.types";
import { createSession, getSession, updateSession } from "./quiz.store";

const questionCategories: Record<string, IQuestion[]> = {
  language: languageQuestions,
  history: historyQuestions,
  law: lawQuestions,
};

export const startQuiz = (req: Request, res: Response) => {
  const { category } = req.body;

  if (
    !category ||
    typeof category !== "string" ||
    !questionCategories[category]
  ) {
    return res
      .status(400)
      .json({ message: "Неверная или отсутствующая категория" });
  }

  const sessionId = randomUUID();
  const session = createSession(sessionId);
  const allQuestionsInCategory = questionCategories[category];

  const shuffled = [...allQuestionsInCategory].sort(() => 0.5 - Math.random());
  const selectedQuestions = shuffled.slice(0, 10);

  if (selectedQuestions.length === 0) {
    return res.status(404).json({ message: "В этой категории нет вопросов" });
  }

  // Обновляем сессию ОДИН РАЗ со всеми данными
  updateSession(sessionId, {
    // `session` здесь не нужен, так как createSession уже содержит базовые поля
    questions: selectedQuestions,
    currentQuestionIndex: 0,
  });

  res.status(201).json({ sessionId, question: selectedQuestions[0] });
};

export const submitAnswer = (req: Request, res: Response) => {
  // 1. Валидация
  const { sessionId } = req.params;
  const { questionId, answer } = req.body;

  if (!questionId || !answer) {
    return res.status(400).json({ message: "questionId и answer обязательны" });
  }

  const session = getSession(sessionId);
  if (!session) {
    return res.status(404).json({ message: "Сессия не найдена" });
  }

  // 2. Находим вопрос, на который отвечали
  const answeredQuestion = session.questions.find((q) => q.id === questionId);
  if (!answeredQuestion) {
    return res
      .status(404)
      .json({ message: "Вопрос не найден в текущей сессии" });
  }

  // 3. Проверяем правильность ответа и обновляем счет
  const isCorrect = answeredQuestion.correctAnswer === answer;
  if (isCorrect) {
    session.score += 1;
  }

  // 4. Сохраняем ответ пользователя
  session.answers.push({ questionId, userAnswer: answer, isCorrect });

  // 5. Увеличиваем индекс
  session.currentQuestionIndex += 1;

  // 6. Проверяем, закончился ли квиз
  if (session.currentQuestionIndex >= session.questions.length) {
    const finalScore = session.score;
    const passed = finalScore >= 7;

    const incorrectAnswers = session.answers
      .filter((a) => !a.isCorrect)
      .map((a) => {
        const question = session.questions.find((q) => q.id === a.questionId);
        return {
          ...question,
          userAnswer: a.userAnswer,
        };
      });

    updateSession(sessionId, session);

    return res.json({
      quizFinished: true,
      passed,
      finalScore,
      incorrectAnswers: passed ? [] : incorrectAnswers,
    });
  }

  // 7. Если квиз не окончен
  const nextQuestion = session.questions[session.currentQuestionIndex];

  updateSession(sessionId, session);

  res.json({
    isCorrect,
    correctAnswer: answeredQuestion.correctAnswer,
    score: session.score,
    nextQuestion: nextQuestion,
    quizFinished: false,
  });
};
