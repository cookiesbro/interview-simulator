import { http, HttpResponse } from 'msw';
import { mockQuestion } from '../../entities/question/model/mock';

const BASE_URL = 'http://localhost:5001/api';

export const handlers = [
  // Обработчик для успешного получения вопроса
  http.get(`${BASE_URL}/questions/random`, () => {
    return HttpResponse.json(mockQuestion);
  }),
];

// Мы можем экспортировать и другие обработчики, напр., для ошибок
export const errorHandlers = [
    http.get(`${BASE_URL}/questions/random`, () => {
        return new HttpResponse(null, { status: 500 });
    }),
];