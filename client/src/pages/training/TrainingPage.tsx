import { useEffect, useState } from 'react';
import { QuestionCard } from '@/entities/question/ui/QuestionCard';
import { startQuiz, submitAnswer } from '@/shared/api/quiz';
import type { IQuestion } from '@/entities/question/model/types';
import WebApp from '@twa-dev/sdk';

export const TrainingPage = () => {
  const [question, setQuestion] = useState<IQuestion | null>(null);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [isQuizFinished, setIsQuizFinished] = useState(false);

  const [answerResult, setAnswerResult] = useState<{
    userAnswer: string;
    correctAnswer: string;
  } | null>(null);

  useEffect(() => {
    const initQuiz = async () => {
      try {
        const { sessionId, question } = await startQuiz();
        setSessionId(sessionId);
        setQuestion(question);
      } catch (err) {
        // Можно добавить обработку ошибки инициализации, если нужно
        console.error('Failed to initialize quiz:', err);
      }
    };
    initQuiz();
  }, []);

  const handleAnswer = async (answer: string) => {
    if (!sessionId || !question || answerResult) return; // Блокируем повторные нажатия, пока виден результат

    try {
      const {
        correctAnswer,
        score: newScore,
        nextQuestion,
      } = await submitAnswer(sessionId, {
        questionId: question.id,
        answer,
      });

      setScore(newScore);
      setAnswerResult({ userAnswer: answer, correctAnswer });

      setTimeout(() => {
        setAnswerResult(null);
        if (nextQuestion) {
          setQuestion(nextQuestion);
        } else {
          setIsQuizFinished(true);
        }
      }, 2000);
    } catch (err) {
      console.error('Failed to submit answer:', err);
    }
  };

  if (!question && !isQuizFinished) {
    return <div>Загрузка сессии...</div>;
  }

  if (isQuizFinished) {
    return (
      <div>
        <h1>Квиз завершен!</h1>
        <h2>Ваш итоговый счет: {score}</h2>
      </div>
    );
  }

  return (
    <div>
      {/* Приветствуем пользователя, если информация доступна */}
      {WebApp.initDataUnsafe.user && (
        <p>Привет, {WebApp.initDataUnsafe.user.first_name}!</p>
      )}
      <h1>Режим тренировки | Счет: {score}</h1>
      {question && (
        <QuestionCard
          question={question}
          onAnswer={handleAnswer}
          isAnswered={!!answerResult}
          userAnswer={answerResult?.userAnswer}
          correctAnswer={answerResult?.correctAnswer}
        />
      )}
    </div>
  );
};
