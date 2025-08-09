import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect } from 'vitest';
import { TrainingPage } from './TrainingPage';
import { server } from '@/test/mocks/server';
import { handlers } from '@/test/mocks/handlers';
import { mockQuestion1, mockQuestion2 } from '@/test/mocks/data';
// Обернем рендер в BrowserRouter, т.к. в будущем можем добавить навигацию
const renderWithRouter = (ui: React.ReactElement) => {
  return render(ui, { wrapper: ({ children }) => <div>{children}</div> }); // Пока без роутера, но готовимся
};

describe('TrainingPage', () => {

  it('should load the first question on mount', async () => {
    server.use(...handlers); // Устанавливаем обработчики для этого теста
    renderWithRouter(<TrainingPage />);

    // Сначала видим состояние загрузки
    expect(screen.getByText(/Загрузка сессии/i)).toBeInTheDocument();

    // Затем, после загрузки, видим текст первого вопроса
    // waitFor нужен, чтобы дождаться асинхронного обновления состояния
    await waitFor(() => {
      expect(
        screen.getByText((_content, element) => {
          return element!.textContent === mockQuestion1.questionText;
        }),
      ).toBeInTheDocument();
    });
  });

  it('should show "Next question" button after an answer and load the next question on click', async () => {
    server.use(...handlers); // Устанавливаем обработчики для этого теста   
    const user = userEvent.setup();
    renderWithRouter(<TrainingPage />);

    // Дожидаемся загрузки первого вопроса
    const firstQuestionOption = await screen.findByRole('button', { name: mockQuestion1.options[0] });

    // Act 1: Отвечаем на первый вопрос
    await user.click(firstQuestionOption);

    // Assert 1: Появляется кнопка "Следующий вопрос"
    const nextButton = await screen.findByRole('button', { name: /Следующий вопрос/i });
    expect(nextButton).toBeInTheDocument();

    // Act 2: Нажимаем на кнопку "Следующий вопрос"
    await user.click(nextButton);
    
    // Assert 2: Появляется текст второго вопроса
    await waitFor(() => {
        expect(screen.getByText(mockQuestion2.questionText)).toBeInTheDocument();
    });
    // И кнопка "Следующий вопрос" исчезает
    expect(screen.queryByRole('button', { name: /Следующий вопрос/i })).not.toBeInTheDocument();
  });

  // Дополнительный тест на завершение квиза можно будет добавить по аналогии
});