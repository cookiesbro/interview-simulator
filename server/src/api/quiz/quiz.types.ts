export interface IQuestion {
  id: string;
  topic: string;
  questionText: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
}
