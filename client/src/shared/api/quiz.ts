import type {
  IQuestion,
  IncorrectAnswer,
} from '@/entities/question/model/types';
import { API_BASE_URL } from '@/shared/config';

// Описываем тип ответа от эндпоинта /start
interface StartQuizResponse {
  sessionId: string;
  question: IQuestion;
}

interface StartQuizPayload {
  category: string;
}
// Новая функция для старта квиза
export const startQuiz = async (
  payload: StartQuizPayload,
): Promise<StartQuizResponse> => {
  const requestUrl = `${API_BASE_URL}/quiz/start`;
  const response = await fetch(requestUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'ngrok-skip-browser-warning': 'true',
    },
    // Отправляем категорию в теле запроса
    body: JSON.stringify(payload),
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
  quizFinished?: boolean;
  passed?: boolean;
  finalScore?: number;
  incorrectAnswers?: IncorrectAnswer[];
}

// Новая функция для получения следующего вопроса
export const submitAnswer = async (
  sessionId: string,
  payload: SubmitAnswerPayload,
): Promise<SubmitAnswerResponse> => {
  // ФОРМИРУЕМ ПОЛНЫЙ URL, КАК В startQuiz
  const requestUrl = `${API_BASE_URL}/quiz/${sessionId}/answer`;

  const response = await fetch(requestUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'ngrok-skip-browser-warning': 'true',
    },
    body: JSON.stringify(payload),
  });
  if (!response.ok) {
    throw new Error('Failed to submit answer');
  }
  return response.json();
};
