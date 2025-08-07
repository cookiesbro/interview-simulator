import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { QuestionCard } from './QuestionCard';
import { mockQuestion } from '../model/mock';

describe('QuestionCard', () => {
  it('should render the question text and topic', () => {
    // 1. Arrange (Подготовка)
    render(<QuestionCard question={mockQuestion} />);

    // 2. Act (Действие) - в данном случае его нет, мы просто проверяем рендер

    // 3. Assert (Проверка)
    expect(screen.getByText(mockQuestion.topic)).toBeInTheDocument();
    // Используем getByText с частью строки, т.к. в тексте есть переносы
    expect(screen.getByText(/Что будет выведено в консоль/)).toBeInTheDocument();
  });

  it('should render all answer options', () => {
    // Arrange
    render(<QuestionCard question={mockQuestion} />);

    // Assert
    mockQuestion.options.forEach((option) => {
      // Проверяем, что для каждого варианта ответа есть кнопка с таким текстом
      expect(screen.getByRole('button', { name: option })).toBeInTheDocument();
    });
  });
});