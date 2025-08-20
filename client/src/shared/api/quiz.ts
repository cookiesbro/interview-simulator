import type { IQuestion } from '../../entities/question/model/types';

// Описываем тип ответа от эндпоинта /start
interface StartQuizResponse {
  sessionId: string;
  question: IQuestion;
}

const headers = {
  'Content-Type': 'application/json',
  // Этот заголовок говорит ngrok пропустить страницу с предупреждением
  'ngrok-skip-browser-warning': 'true',
};

// Новая функция для старта квиза
export const startQuiz = async (): Promise<StartQuizResponse> => {
  const requestUrl = `/api/quiz/start`;
  const response = await fetch(requestUrl, {
    method: 'POST',
    headers: { 'ngrok-skip-browser-warning': 'true' },
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
  const response = await fetch(`/api/quiz/${sessionId}/answer`, {
    method: 'POST',
    headers: { ...headers, 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  if (!response.ok) {
    throw new Error('Failed to submit answer');
  }
  return response.json();
};
