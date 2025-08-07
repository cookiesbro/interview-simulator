export interface IQuestion {
  id: string;
  topic: string;
  questionText: string;
  options: string[];
  correctAnswer: string; // Пока просто строка, потом может быть индекс
  explanation: string;
}