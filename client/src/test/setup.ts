import '@testing-library/jest-dom';
import { beforeAll, afterEach, afterAll } from 'vitest';
import { server } from './mocks/server'; // Импортируем наш мок-сервер из нового места

// Запускаем мок-сервер перед всеми тестами
beforeAll(() => server.listen());

// Сбрасываем все обработчики запросов после каждого теста,
// чтобы тесты не влияли друг на друга
afterEach(() => server.resetHandlers());

// Останавливаем мок-сервер после всех тестов
afterAll(() => server.close());