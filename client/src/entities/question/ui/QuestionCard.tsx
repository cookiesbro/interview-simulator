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
  // Убрали весь внутренний state! Компонент стал "глупым", это хорошо.

  const getButtonClass = (option: string) => {
    if (!isAnswered) return styles.optionButton;
    if (option === correctAnswer) return styles.correct;
    if (option === userAnswer) return styles.incorrect;
    return styles.optionButton;
  };

  return (
    <div className={styles.card}>
      {/* ... topic, questionText ... */}
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
