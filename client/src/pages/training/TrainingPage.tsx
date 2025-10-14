import { useState } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { QuestionCard } from '@/entities/question/ui/QuestionCard';
import { submitAnswer } from '@/shared/api/quiz';
import type { IQuestion } from '@/entities/question/model/types';
import styles from './TrainingPage.module.css';

export function TrainingPage() {
  const navigate = useNavigate();
  const location = useLocation();

  // Получаем начальные данные, переданные от HomePage
  const [sessionId] = useState<string | null>(location.state?.sessionId);
  const [question, setQuestion] = useState<IQuestion | null>(
    location.state?.initialQuestion,
  );
  const [score, setScore] = useState(0);
  const [questionNumber, setQuestionNumber] = useState(1);

  const [answerResult, setAnswerResult] = useState<{
    userAnswer: string;
    correctAnswer: string;
  } | null>(null);

  const handleAnswer = async (answer: string) => {
    if (!sessionId || !question || answerResult) return;

    try {
      const result = await submitAnswer(sessionId, {
        questionId: question.id,
        answer,
      });

      setScore(result.score);
      setAnswerResult({
        userAnswer: answer,
        correctAnswer: result.correctAnswer,
      });

      // Плавный переход к следующему вопросу или результатам
      setTimeout(() => {
        if (result.quizFinished) {
          navigate('/results', { state: result });
        } else {
          setQuestion(result.nextQuestion);
          setQuestionNumber((prev) => prev + 1);
          setAnswerResult(null);
        }
      }, 2000);
    } catch (err) {
      console.error('Failed to submit answer:', err);
    }
  };

  if (!sessionId || !question) {
    return (
      <div className={styles.container}>
        <p>Ошибка: сессия не была начата.</p>
        <Link to="/">Вернуться к выбору категории</Link>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Вопрос {questionNumber} / 10</h1>
        <div className={styles.score}>Счет: {score}</div>
      </div>
      <div className={styles.progressBarContainer}>
        <motion.div
          className={styles.progressBar}
          initial={{ width: 0 }}
          animate={{ width: `${(questionNumber / 10) * 100}%` }}
          transition={{ duration: 0.5 }}
        />
      </div>
      <AnimatePresence mode="wait">
        <motion.div
          key={question.id}
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ duration: 0.3 }}
        >
          <QuestionCard
            question={question}
            onAnswer={handleAnswer}
            isAnswered={!!answerResult}
            userAnswer={answerResult?.userAnswer}
            correctAnswer={answerResult?.correctAnswer}
          />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
