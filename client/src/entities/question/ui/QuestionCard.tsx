import type { IQuestion } from '../model/types';
import styles from './QuestionCard.module.css';

interface QuestionCardProps {
  question: IQuestion;
}

export const QuestionCard = ({ question }: QuestionCardProps) => {
  return (
    <div className={styles.card}>
      <h2 className={styles.topic}>{question.topic}</h2>
      <pre className={styles.questionText}>{question.questionText}</pre>
      <div className={styles.options}>
        {question.options.map((option) => (
          <button key={option} className={styles.optionButton}>
            {option}
          </button>
        ))}
      </div>
    </div>
  );
};
