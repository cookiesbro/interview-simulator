import { Router } from 'express';
import { getRandomQuestion } from './question.controller';

const router = Router();

// Когда придет GET-запрос на /api/questions/random, вызвать getRandomQuestion
router.get('/random', getRandomQuestion);

export default router;