import { useEffect, useState } from 'react';
import { QuestionCard } from '../../entities/question/ui/QuestionCard';
import { fetchRandomQuestion } from '../../shared/api/quiz';
import type { IQuestion } from '../../entities/question/model/types';

export const TrainingPage = () => {
  const [question, setQuestion] = useState<IQuestion | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadQuestion = async () => {
      try {
        setIsLoading(true); // Начинаем загрузку
        setError(null); // Сбрасываем предыдущие ошибки
        const fetchedQuestion = await fetchRandomQuestion();
        setQuestion(fetchedQuestion);
      } catch (err) {
        // err здесь может быть любым, поэтому приводим к Error
        setError(
          (err as Error).message || 'Произошла ошибка при загрузке вопроса.',
        );
      } finally {
        setIsLoading(false); // Загрузка завершена (успешно или с ошибкой)
      }
    };

    loadQuestion();
  }, []); // Пустой массив - эффект запустится один раз при монтировании

  if (isLoading) {
    return <div>Загрузка вопроса...</div>;
  }

  if (error) {
    return <div>Ошибка: {error}</div>;
  }

  return (
    <div>
      <h1>Режим тренировки</h1>
      {question && <QuestionCard question={question} />}
    </div>
  );
};
