"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.submitAnswer = exports.startQuiz = void 0;
const crypto_1 = require("crypto"); // Встроенный в Node.js генератор UUID
const questions_json_1 = __importDefault(require("../../data/questions.json"));
const quiz_store_1 = require("./quiz.store");
const allQuestions = questions_json_1.default;
// POST /api/quiz/start
const startQuiz = (req, res) => {
    const sessionId = (0, crypto_1.randomUUID)();
    const session = (0, quiz_store_1.createSession)(sessionId);
    const availableQuestions = allQuestions.filter((q) => !session.seenQuestionIds.has(q.id));
    if (availableQuestions.length === 0) {
        return res.status(404).json({ message: "Нет доступных вопросов" });
    }
    const randomQuestion = availableQuestions[Math.floor(Math.random() * availableQuestions.length)];
    // Добавляем ID вопроса в "увиденные"
    session.seenQuestionIds.add(randomQuestion.id);
    (0, quiz_store_1.updateSession)(sessionId, { seenQuestionIds: session.seenQuestionIds });
    res.status(201).json({ sessionId, question: randomQuestion });
};
exports.startQuiz = startQuiz;
// НОВЫЙ ЭНДПОИНТ: POST /api/quiz/:sessionId/answer
const submitAnswer = (req, res) => {
    // 1. Валидация
    const { sessionId } = req.params;
    const { questionId, answer } = req.body; // Получаем ID вопроса и ответ от клиента
    if (!questionId || !answer) {
        return res.status(400).json({ message: "questionId и answer обязательны" });
    }
    const session = (0, quiz_store_1.getSession)(sessionId);
    if (!session) {
        return res.status(404).json({ message: "Сессия не найдена" });
    }
    // 2. Находим вопрос, на который отвечали
    const answeredQuestion = allQuestions.find((q) => q.id === questionId);
    if (!answeredQuestion) {
        return res.status(404).json({ message: "Вопрос не найден" });
    }
    // 3. Проверяем правильность ответа
    const isCorrect = answeredQuestion.correctAnswer === answer;
    if (isCorrect) {
        session.score += 1; // Увеличиваем счет
    }
    // 4. Находим следующий уникальный вопрос
    const availableQuestions = allQuestions.filter((q) => !session.seenQuestionIds.has(q.id));
    const nextQuestion = availableQuestions.length > 0
        ? availableQuestions[Math.floor(Math.random() * availableQuestions.length)]
        : null;
    if (nextQuestion) {
        session.seenQuestionIds.add(nextQuestion.id);
    }
    (0, quiz_store_1.updateSession)(sessionId, session);
    // 5. Отправляем развернутый ответ клиенту
    res.json({
        isCorrect,
        correctAnswer: answeredQuestion.correctAnswer,
        score: session.score,
        nextQuestion: nextQuestion,
    });
};
exports.submitAnswer = submitAnswer;
