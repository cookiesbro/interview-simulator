import { QuestionCard } from '../../entities/question/ui/QuestionCard';
import { mockQuestion } from '../../entities/question/model/mock';

export const TrainingPage = () => {
  return (
    <div>
      <h1>Режим тренировки</h1>
      <QuestionCard question={mockQuestion} />
    </div>
  );
};