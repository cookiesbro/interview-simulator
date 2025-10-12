import type { IQuestion } from "./quiz.types";

// Описываем, как выглядит одна сессия
interface QuizSession {
  sessionId: string;
  score: number;
  questions: IQuestion[]; // Массив из 10 вопросов для текущей сессии
  currentQuestionIndex: number; // Индекс текущего вопроса (от 0 до 9)
  // Сохраняем ответы для финального экрана с ошибками
  answers: { questionId: string; userAnswer: string; isCorrect: boolean }[];
}

// Хранилище в памяти: Map, где ключ - sessionId, значение - объект сессии
const sessions = new Map<string, QuizSession>();

// Функция для создания новой сессии
export const createSession = (sessionId: string): QuizSession => {
  const newSession: QuizSession = {
    sessionId,
    score: 0,
    questions: [],
    currentQuestionIndex: 0,
    answers: [],
  };
  sessions.set(sessionId, newSession);
  return newSession;
};

// Функция для получения сессии по ID
export const getSession = (sessionId: string): QuizSession | undefined => {
  return sessions.get(sessionId);
};

// Функция для обновления сессии
export const updateSession = (
  sessionId: string,
  updatedData: Partial<QuizSession>
): QuizSession | undefined => {
  const session = getSession(sessionId);
  if (!session) {
    return undefined;
  }

  const updatedSession = { ...session, ...updatedData };
  sessions.set(sessionId, updatedSession);
  return updatedSession;
};
