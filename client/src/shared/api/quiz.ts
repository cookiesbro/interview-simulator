// Импортируем наш тип вопроса, чтобы TypeScript понимал, что мы ожидаем от сервера
import type { IQuestion } from '../../entities/question/model/types';
import { API_BASE_URL } from '@/shared/config';

// Описываем тип ответа от эндпоинта /start
interface StartQuizResponse {
  sessionId: string;
  question: IQuestion;
}

// Новая функция для старта квиза
export const startQuiz = async (): Promise<StartQuizResponse> => {
  const response = await fetch(`${API_BASE_URL}/quiz/start`, {
    method: 'POST',
  });
  if (!response.ok) {
    throw new Error('Failed to start quiz');
  }
  return response.json();
};

// Описываем тело запроса для /answer
interface SubmitAnswerPayload {
  questionId: string;
  answer: string;
}

// Описываем ответ от /answer
interface SubmitAnswerResponse {
  isCorrect: boolean;
  correctAnswer: string;
  score: number;
  nextQuestion: IQuestion | null;
}

// Новая функция для получения следующего вопроса
export const submitAnswer = async (
  sessionId: string,
  payload: SubmitAnswerPayload,
): Promise<SubmitAnswerResponse> => {
  const response = await fetch(`${API_BASE_URL}/quiz/${sessionId}/answer`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });
  if (!response.ok) {
    throw new Error('Failed to submit answer');
  }
  return response.json();
};
