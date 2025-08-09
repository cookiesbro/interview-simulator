import { describe, it, expect } from 'vitest';
import { server } from '@/test/mocks/server';
import { handlers } from '@/test/mocks/handlers'; // errorHandlers можно убрать, если не используем
import { startQuiz, fetchNextQuestion } from './quiz'; // Импортируем ТОЛЬКО новые функции
import { mockQuestion1, mockQuestion2 } from '@/test/mocks/data';

describe('quiz API', () => {
  // ВСЕ СТАРЫЕ ТЕСТЫ ДЛЯ fetchRandomQuestion УДАЛЕНЫ

  // ОСТАВЛЯЕМ ТОЛЬКО ТЕСТЫ ДЛЯ НОВОЙ ЛОГИКИ СЕССИЙ

  it('should start a new quiz session successfully', async () => {
    // Arrange: устанавливаем обработчики для успешного ответа
    server.use(...handlers);

    // Act: вызываем функцию старта квиза
    const response = await startQuiz();

    // Assert: проверяем, что получили правильный ID сессии и первый вопрос
    expect(response.sessionId).toBe('mock-session-id');
    expect(response.question).toEqual(mockQuestion1);
  });

  it('should fetch the next question successfully', async () => {
    // Arrange: устанавливаем обработчики для успешного ответа
    server.use(...handlers);

    // Act: вызываем функцию получения следующего вопроса
    const response = await fetchNextQuestion('mock-session-id');

    // Assert: проверяем, что получили второй вопрос
    expect(response.question).toEqual(mockQuestion2);
  });
});