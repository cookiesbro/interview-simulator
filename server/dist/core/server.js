"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
require("dotenv/config"); // Загружаем переменные из .env файла
const quiz_router_1 = __importDefault(require("../api/quiz/quiz.router"));
const cors_1 = __importDefault(require("cors")); // Импортируем cors
const app = (0, express_1.default)();
const PORT = process.env.PORT || 5001;
// Middleware
app.use((0, cors_1.default)()); // Включили CORS, чтобы клиент мог делать запросы
app.use(express_1.default.json()); // Для парсинга JSON-тел запросов
// Routes
app.use("/api/quiz", quiz_router_1.default);
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
// Создали сервер на Express, который слушает порт из переменных окружения или 5001 по умолчанию.
