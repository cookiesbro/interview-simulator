import type { IQuestion } from './types';

export const mockQuestion: IQuestion = {
  id: 'js-001',
  topic: 'JavaScript',
  questionText:
    'Что будет выведено в консоль и почему?\n\nfor (var i = 0; i < 3; i++) {\n  setTimeout(() => console.log(i), 10);\n}',
  options: ['0, 1, 2', '3, 3, 3', 'undefined, undefined, undefined'],
  correctAnswer: '3, 3, 3',
  explanation:
    '`setTimeout` выполнится после окончания цикла, а переменная `i`, объявленная через `var`, существует в единой области видимости и на момент выполнения будет равна 3.',
};