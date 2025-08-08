import { Router } from 'express';
import { startQuiz, getNextQuestion } from './quiz.controller';

const router = Router();

router.post('/start', startQuiz);
router.post('/:sessionId/next', getNextQuestion);

export default router;