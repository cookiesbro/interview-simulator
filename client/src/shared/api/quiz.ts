// Импортируем наш тип вопроса, чтобы TypeScript понимал, что мы ожидаем от сервера
import type { IQuestion } from '../../entities/question/model/types';

// Определяем базовый URL нашего бэкенда
const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5001/api';

export const fetchRandomQuestion = async (): Promise<IQuestion> => {
  try {
    const response = await fetch(`${BASE_URL}/questions/random`);

    // Проверка статуса ответа
    if (!response.ok) {
      // Если ответ не успешный (например, 404 или 500), выбрасываем ошибку
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to fetch question');
    }

    // Парсим JSON-ответ и возвращаем его
    const data: IQuestion = await response.json();
    return data;
  } catch (error) {
    // Логируем ошибку и перебрасываем ее дальше
    console.error('Error fetching random question:', error);
    throw error;
  }
};