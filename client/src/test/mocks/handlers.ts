import { http, HttpResponse } from 'msw';
import { mockQuestion1, mockQuestion2 } from './data';
import { API_BASE_URL } from '@/shared/config';

export const handlers = [
  http.post(`${API_BASE_URL}/quiz/start`, () => {
    return HttpResponse.json({
      sessionId: 'mock-session-id',
      question: mockQuestion1, // Используем mockQuestion1
    });
  }),
  http.post(`${API_BASE_URL}/quiz/mock-session-id/next`, () => {
    return HttpResponse.json({
      question: mockQuestion2, // Используем mockQuestion2
    });
  }),
  // Успешное получение следующего вопроса
  http.post(`${API_BASE_URL}/quiz/mock-session-id/next`, () => {
    return HttpResponse.json({
      question: mockQuestion2,
    });
  }),
  // Завершение квиза
  http.post(`${API_BASE_URL}/quiz/mock-session-id-finished/next`, () => {
    return HttpResponse.json({
      question: null,
      message: 'Все вопросы пройдены!',
    });
  }),
];

// Мы можем экспортировать и другие обработчики, напр., для ошибок
export const errorHandlers = [
  http.get(`${API_BASE_URL}/questions/random`, () => {
    return new HttpResponse(null, { status: 500 });
  }),
  http.post(`${API_BASE_URL}/quiz/mock-session-id/answer`, () => {
    return HttpResponse.json({
      isCorrect: true,
      correctAnswer: mockQuestion1.correctAnswer,
      score: 1,
      nextQuestion: mockQuestion2,
    });
  }),
];
