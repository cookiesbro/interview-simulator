import { describe, it, expect } from 'vitest';
import { server } from '../../test/mocks/server';
import { handlers, errorHandlers } from '../../test/mocks/handlers';
import { fetchRandomQuestion } from './quiz';
import { mockQuestion } from '../../entities/question/model/mock';

describe('quiz API', () => {
  it('should fetch a random question successfully', async () => {
    // Arrange: Используем готовый обработчик для успешного ответа
    server.use(...handlers);

    // Act
    const question = await fetchRandomQuestion();

    // Assert
    expect(question).toEqual(mockQuestion);
  });

  it('should throw an error if the fetch fails', async () => {
    // Arrange: Используем обработчик для ошибки 500
    server.use(...errorHandlers);

    // Act & Assert
    await expect(fetchRandomQuestion()).rejects.toThrow();
  });
});
// Этот тест проверяет, что функция fetchRandomQuestion корректно обрабатывает успешный ответ и ошибки сервера.