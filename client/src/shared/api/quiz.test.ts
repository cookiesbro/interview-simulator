import { describe, it, expect } from 'vitest';
import { server } from '@/test/mocks/server';
import { handlers } from '@/test/mocks/handlers'; // errorHandlers можно убрать, если не используем
import { startQuiz, submitAnswer } from './quiz'; // Импортируем ТОЛЬКО новые функции
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
});

it('should submit an answer and get the next question', async () => {
  server.use(...handlers); // Убедись, что в handlers есть мок для этого запроса

  // Act
  const response = await submitAnswer('mock-session-id', {
    questionId: mockQuestion1.id,
    answer: mockQuestion1.options[0],
  });

  // Assert
  expect(response.nextQuestion).toEqual(mockQuestion2);
  expect(response.isCorrect).toBeDefined(); // Проверяем, что поле isCorrect существует
});
