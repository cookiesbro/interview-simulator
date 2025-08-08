// Описываем, как выглядит одна сессия
interface QuizSession {
  sessionId: string;
  seenQuestionIds: Set<string>; // Множество для хранения ID уже показанных вопросов
  score: number;
}

// Хранилище в памяти: Map, где ключ - sessionId, значение - объект сессии
const sessions = new Map<string, QuizSession>();

// Функция для создания новой сессии
export const createSession = (sessionId: string): QuizSession => {
  const newSession: QuizSession = {
    sessionId,
    seenQuestionIds: new Set(),
    score: 0,
  };
  sessions.set(sessionId, newSession);
  return newSession;
};

// Функция для получения сессии по ID
export const getSession = (sessionId: string): QuizSession | undefined => {
  return sessions.get(sessionId);
};

// Функция для обновления сессии
export const updateSession = (sessionId: string, updatedData: Partial<QuizSession>): QuizSession | undefined => {
    const session = getSession(sessionId);
    if (!session) {
        return undefined;
    }
    
    const updatedSession = { ...session, ...updatedData };
    sessions.set(sessionId, updatedSession);
    return updatedSession;
}