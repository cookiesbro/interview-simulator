import { useLocation, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/shared/ui/Button';
import { Card, CardContent } from '@/shared/ui/Card';
import { QuestionCard } from '@/entities/question/ui/QuestionCard';
import { ThumbsUp, ThumbsDown } from 'lucide-react';
import type { IncorrectAnswer } from '@/entities/question/model/types';
import styles from './ResultsPage.module.css';

export function ResultsPage() {
  const location = useLocation();
  const results = location.state;

  if (!results) {
    return (
      <div className={styles.container}>
        <p>Результаты не найдены.</p>
        <Link to="/">Начать новую тренировку.</Link>
      </div>
    );
  }

  const { passed, finalScore, incorrectAnswers } = results;

  return (
    <div className={styles.container}>
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Card className={styles.resultsCard}>
          <CardContent>
            {passed ? (
              <ThumbsUp className={`${styles.icon} ${styles.success}`} />
            ) : (
              <ThumbsDown className={`${styles.icon} ${styles.failure}`} />
            )}
            <h1 className={styles.title}>
              {passed
                ? 'Поздравляем! Тест пройден!'
                : 'Нужно еще потренироваться'}
            </h1>
            <p className={styles.score}>
              Ваш итоговый счет: <strong>{finalScore} / 10</strong>
            </p>

            {!passed && incorrectAnswers && incorrectAnswers.length > 0 && (
              <div className={styles.errorsSection}>
                <h2 className={styles.errorsTitle}>Разбор ошибок:</h2>
                <div className={styles.errorsGrid}>
                  {/* ИСПРАВЛЕНИЕ: Заменяем `any` на `IncorrectAnswer` */}
                  {incorrectAnswers.map((question: IncorrectAnswer) => (
                    <QuestionCard
                      key={question.id}
                      question={question}
                      onAnswer={() => {}} // Пустая функция, т.к. здесь нет интерактива
                      isAnswered={true}
                      userAnswer={question.userAnswer}
                      correctAnswer={question.correctAnswer}
                    />
                  ))}
                </div>
              </div>
            )}

            <Link to="/" className={styles.link}>
              <Button>Выбрать другую тему</Button>
            </Link>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
