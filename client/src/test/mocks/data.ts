import type { IQuestion } from "../../entities/question/model/types";

export const mockQuestion1: IQuestion = {
  id: 'js-001',
  topic: 'JavaScript',
  questionText: 'Что будет выведено в консоль и почему?\n\nfor (var i = 0; i < 3; i++) {\n  setTimeout(() => console.log(i), 10);\n}',
  options: ['0, 1, 2', '3, 3, 3', 'undefined, undefined, undefined'],
  correctAnswer: '3, 3, 3',
  explanation: '...',
};

export const mockQuestion2: IQuestion = {
  id: 'react-001',
  topic: 'React',
  questionText: 'Что такое Virtual DOM?', // Уникальный текст для второго вопроса
  options: ['Объект, описывающий UI', 'Прямая ссылка на реальный DOM', 'Специальный HTML-тег'],
  correctAnswer: 'Объект, описывающий UI',
  explanation: '...',
};