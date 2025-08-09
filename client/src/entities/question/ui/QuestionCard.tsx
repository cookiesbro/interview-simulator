import { useState, useEffect } from 'react';
import type { IQuestion } from '../model/types';
import styles from './QuestionCard.module.css';

interface QuestionCardProps {
  question: IQuestion;
  onAnswered: () => void; // Новый пропс: функция-колбэк
}

export const QuestionCard = ({ question, onAnswered }: QuestionCardProps) => {
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);

  // Сбрасываем состояние при смене вопроса
  useEffect(() => {
    setSelectedAnswer(null);
  }, [question.id]);

  const handleOptionClick = (option: string) => {
    if (selectedAnswer) return;
    setSelectedAnswer(option);
    onAnswered(); // Вызываем колбэк, когда пользователь выбрал ответ
  };

  return (
    <div className={styles.card}>
      <h2 className={styles.topic}>{question.topic}</h2>
      {/* Используем pre для сохранения форматирования текста вопроса */}
      {/* Это важно, если в вопросе есть переносы строк или особое форматирование */}
      <pre className={styles.questionText}>{question.questionText}</pre>
      {/* Отображаем варианты ответов */}
      <div className={styles.options}>
        {question.options.map((option) => {
          const isSelected = selectedAnswer === option;
          const isCorrect = question.correctAnswer === option;

          const classNames = [styles.optionButton];
          if (selectedAnswer) {
            if (isCorrect) {
              classNames.push(styles.correct);
            } else if (isSelected) {
              classNames.push(styles.incorrect);
            }
          }

          return (
            <button
              key={option}
              className={classNames.join(' ')}
              onClick={() => handleOptionClick(option)}
              disabled={!!selectedAnswer}
            >
              {option}
            </button>
          );
        })}
      </div>
    </div>
  );
};
