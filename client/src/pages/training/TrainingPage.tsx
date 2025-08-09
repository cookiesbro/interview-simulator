import { useEffect, useState } from 'react';
import { QuestionCard } from '../../entities/question/ui/QuestionCard';
import { startQuiz, fetchNextQuestion } from '../../shared/api/quiz'; // Импортируем новые функции
import type { IQuestion } from '../../entities/question/model/types';

export const TrainingPage = () => {
  // Состояния для данных
  const [question, setQuestion] = useState<IQuestion | null>(null);
  const [sessionId, setSessionId] = useState<string | null>(null);
  
  // Состояния для UX
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isQuizFinished, setIsQuizFinished] = useState(false);
  const [showNextButton, setShowNextButton] = useState(false);

  // Запускаем сессию при первой загрузке страницы
  useEffect(() => {
    const initQuiz = async () => {
      try {
        setIsLoading(true);
        const { sessionId, question } = await startQuiz();
        setSessionId(sessionId);
        setQuestion(question);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setIsLoading(false);
      }
    };
    initQuiz();
  }, []);

  // Обработчик для кнопки "Следующий вопрос"
  const handleNextQuestion = async () => {
    if (!sessionId) return;
    
    try {
        setIsLoading(true); // Показываем загрузку для следующего вопроса
        setShowNextButton(false); // Прячем кнопку
        const { question: nextQuestion, message } = await fetchNextQuestion(sessionId);
        
        if (nextQuestion) {
            setQuestion(nextQuestion);
        } else {
            setIsQuizFinished(true); // Вопросы закончились
            setQuestion(null);
        }
    } catch(err) {
        setError((err as Error).message);
    } finally {
        setIsLoading(false);
    }
  };
  
  // Теперь карточка вопроса должна сообщать нам, когда на нее ответили
  const handleAnswered = () => {
    setShowNextButton(true);
  };

  // Рендеринг в зависимости от состояния
  if (isLoading && !question) { // Показываем начальную загрузку
    return <div>Загрузка сессии...</div>;
  }

  if (error) {
    return <div>Ошибка: {error}</div>;
  }
    
  if (isQuizFinished) {
      return <div>Поздравляем! Вы прошли все вопросы.</div>;
  }

  return (
    <div>
      <h1>Режим тренировки</h1>
      {isLoading && <div>Загрузка следующего вопроса...</div>}
      {question && (
        <QuestionCard 
            question={question} 
            onAnswered={handleAnswered} // Передаем колбэк
        />
      )}
      {showNextButton && (
        <button onClick={handleNextQuestion} style={{ marginTop: '1rem' }}>
            Следующий вопрос
        </button>
      )}
    </div>
  );
};