import { http, HttpResponse } from 'msw';
import { mockQuestion1, mockQuestion2 } from './data';

export const handlers = [
  http.post(`/api/quiz/start`, () => {
    return HttpResponse.json({
      sessionId: 'mock-session-id',
      question: mockQuestion1, // Используем mockQuestion1
    });
  }),
  http.post(`/api/quiz/mock-session-id/next`, () => {
    return HttpResponse.json({
      question: mockQuestion2, // Используем mockQuestion2
    });
  }),
  // Успешное получение следующего вопроса
  http.post(`/api/quiz/mock-session-id/next`, () => {
    return HttpResponse.json({
      question: mockQuestion2,
    });
  }),
  // Завершение квиза
  http.post(`/api/quiz/mock-session-id-finished/next`, () => {
    return HttpResponse.json({
      question: null,
      message: 'Все вопросы пройдены!',
    });
  }),
];

export const errorHandlers = [
  http.get(`/api/questions/random`, () => {
    return new HttpResponse(null, { status: 500 });
  }),
  http.post(`/api/quiz/mock-session-id/answer`, () => {
    return HttpResponse.json({
      isCorrect: true,
      correctAnswer: mockQuestion1.correctAnswer,
      score: 1,
      nextQuestion: mockQuestion2,
    });
  }),
];
