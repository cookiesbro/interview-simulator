"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateSession = exports.getSession = exports.createSession = void 0;
// Хранилище в памяти: Map, где ключ - sessionId, значение - объект сессии
const sessions = new Map();
// Функция для создания новой сессии
const createSession = (sessionId) => {
    const newSession = {
        sessionId,
        seenQuestionIds: new Set(),
        score: 0,
    };
    sessions.set(sessionId, newSession);
    return newSession;
};
exports.createSession = createSession;
// Функция для получения сессии по ID
const getSession = (sessionId) => {
    return sessions.get(sessionId);
};
exports.getSession = getSession;
// Функция для обновления сессии
const updateSession = (sessionId, updatedData) => {
    const session = (0, exports.getSession)(sessionId);
    if (!session) {
        return undefined;
    }
    const updatedSession = Object.assign(Object.assign({}, session), updatedData);
    sessions.set(sessionId, updatedSession);
    return updatedSession;
};
exports.updateSession = updateSession;
