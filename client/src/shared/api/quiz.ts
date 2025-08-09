// Импортируем наш тип вопроса, чтобы TypeScript понимал, что мы ожидаем от сервера
import type { IQuestion } from '../../entities/question/model/types';
import { API_BASE_URL } from '@/shared/config';

// Описываем тип ответа от эндпоинта /start
interface StartQuizResponse {
  sessionId: string;
  question: IQuestion;
}

// Описываем тип ответа от эндпоинта /next
interface NextQuestionResponse {
  question: IQuestion | null; // Вопрос может быть null, если они закончились
  message?: string;
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

// Новая функция для получения следующего вопроса
export const fetchNextQuestion = async (
  sessionId: string,
): Promise<NextQuestionResponse> => {
  const response = await fetch(`${API_BASE_URL}/quiz/${sessionId}/next`, {
    method: 'POST',
  });
  if (!response.ok) {
    throw new Error('Failed to fetch next question');
  }
  return response.json();
};
