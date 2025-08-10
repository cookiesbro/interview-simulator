import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { QuestionCard } from './QuestionCard';
import { mockQuestion1 } from '@/test/mocks/data';

describe('QuestionCard', () => {
  // Тест №1: Проверяем базовый рендер в состоянии "не отвечен"
  it('should render the question and all options when not answered', () => {
    render(
      <QuestionCard
        question={mockQuestion1}
        onAnswer={vi.fn()}
        isAnswered={false} // Передаем isAnswered
      />,
    );
    expect(screen.getByText(mockQuestion1.questionText)).toBeInTheDocument();
    mockQuestion1.options.forEach((option) => {
      const button = screen.getByRole('button', { name: option });
      expect(button).toBeInTheDocument();
      expect(button).not.toBeDisabled(); // Кнопки должны быть активны
    });
  });

  // Тест №2: Проверяем, что колбэк вызывается при клике
  it('should call onAnswer with the selected option on click', async () => {
    const user = userEvent.setup();
    const handleAnswer = vi.fn(); // Создаем мок-функцию для проверки

    render(
      <QuestionCard
        question={mockQuestion1}
        onAnswer={handleAnswer}
        isAnswered={false}
      />,
    );

    const firstOptionButton = screen.getByRole('button', {
      name: mockQuestion1.options[0],
    });
    await user.click(firstOptionButton);

    expect(handleAnswer).toHaveBeenCalledOnce(); // Проверяем, что функция была вызвана
    expect(handleAnswer).toHaveBeenCalledWith(mockQuestion1.options[0]); // И вызвана с правильным аргументом
  });

  // Тест №3: Проверяем рендер в состоянии "отвечен"
  it('should disable buttons and show correct/incorrect styles when answered', () => {
    render(
      <QuestionCard
        question={mockQuestion1}
        onAnswer={vi.fn()}
        isAnswered={true} // <-- Теперь isAnswered = true
        userAnswer={mockQuestion1.options[0]} // Передаем ответ пользователя (неправильный)
        correctAnswer={mockQuestion1.correctAnswer} // Передаем правильный ответ
      />,
    );

    const incorrectButton = screen.getByRole('button', {
      name: mockQuestion1.options[0],
    });
    const correctButton = screen.getByRole('button', {
      name: mockQuestion1.correctAnswer,
    });

    // Проверяем стили
    expect(incorrectButton).toHaveClass(/incorrect/);
    expect(correctButton).toHaveClass(/correct/);

    // Проверяем, что все кнопки заблокированы
    const allButtons = screen.getAllByRole('button');
    allButtons.forEach((button) => expect(button).toBeDisabled());
  });
});
