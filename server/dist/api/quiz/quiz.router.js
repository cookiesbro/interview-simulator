"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const quiz_controller_1 = require("./quiz.controller");
const router = (0, express_1.Router)();
router.post('/start', quiz_controller_1.startQuiz);
router.post('/:sessionId/answer', quiz_controller_1.submitAnswer);
exports.default = router;
