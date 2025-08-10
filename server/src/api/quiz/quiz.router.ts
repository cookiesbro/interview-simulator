import { Router } from 'express';
import { startQuiz, submitAnswer } from './quiz.controller';

const router = Router();

router.post('/start', startQuiz);
router.post('/:sessionId/answer', submitAnswer);

export default router;