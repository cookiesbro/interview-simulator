import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect } from 'vitest';
import { QuestionCard } from './QuestionCard';
import { mockQuestion } from '../model/mock';

describe('QuestionCard', () => {
  // Старый тест на рендер все еще полезен
  it('should render the question and all options', () => {
    render(<QuestionCard question={mockQuestion} />);
    expect(
      screen.getByText((_content, element) => {
        return element!.textContent === mockQuestion.questionText;
      }),
    ).toBeInTheDocument();
    mockQuestion.options.forEach((option) => {
      expect(screen.getByRole('button', { name: option })).toBeInTheDocument();
    });
  });

  it('should highlight the correct answer in green when clicked', async () => {
    const user = userEvent.setup(); // Настраиваем user-event
    render(<QuestionCard question={mockQuestion} />);

    // Находим правильную кнопку по тексту
    const correctButton = screen.getByRole('button', {
      name: mockQuestion.correctAnswer,
    });

    // Act: Пользователь кликает на правильный ответ
    await user.click(correctButton);

    // Assert: Кнопка должна получить класс "correct" и все кнопки должны быть заблокированы
    expect(correctButton).toHaveClass(/correct/);
    const allButtons = screen.getAllByRole('button');
    allButtons.forEach((button) => expect(button).toBeDisabled());
  });

  // Новый тест на поведение: клик по НЕПРАВИЛЬНОМУ ответу
  it('should highlight the selected answer in red and the correct answer in green', async () => {
    const user = userEvent.setup();
    render(<QuestionCard question={mockQuestion} />);

    // Находим неправильный вариант для клика
    const incorrectOption = mockQuestion.options.find(
      (opt) => opt !== mockQuestion.correctAnswer,
    )!;
    const incorrectButton = screen.getByRole('button', {
      name: incorrectOption,
    });
    const correctButton = screen.getByRole('button', {
      name: mockQuestion.correctAnswer,
    });

    // Act: Пользователь кликает на неправильный ответ
    await user.click(incorrectButton);

    // Assert: Проверяем подсветку и блокировку
    expect(incorrectButton).toHaveClass(/incorrect/);
    expect(correctButton).toHaveClass(/correct/); // Правильный ответ тоже подсвечивается

    const allButtons = screen.getAllByRole('button');
    allButtons.forEach((button) => expect(button).toBeDisabled());
  });
});
