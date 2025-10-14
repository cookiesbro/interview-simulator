import type { IQuestion } from '../model/types';
import styles from './QuestionCard.module.css';

interface QuestionCardProps {
  question: IQuestion;
  // Теперь колбэк принимает выбранный ответ
  onAnswer: (answer: string) => void;
  // Пропсы для отображения результата, который пришел с сервера
  isAnswered: boolean;
  userAnswer?: string;
  correctAnswer?: string;
}

export const QuestionCard = ({
  question,
  onAnswer,
  isAnswered,
  userAnswer,
  correctAnswer,
}: QuestionCardProps) => {
  const getButtonClass = (option: string) => {
    const baseClass = styles.optionButton;

    if (!isAnswered) return baseClass;

    if (option === correctAnswer) return `${baseClass} ${styles.correct}`;
    if (option === userAnswer) return `${baseClass} ${styles.incorrect}`;

    return baseClass;
  };

  return (
    <div className={styles.card}>
      <h2 className={styles.topic}>{question.topic}</h2>
      <pre className={styles.questionText}>{question.questionText}</pre>
      <div className={styles.options}>
        {question.options.map((option) => (
          <button
            key={option}
            className={getButtonClass(option)}
            onClick={() => onAnswer(option)}
            disabled={isAnswered}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
};
