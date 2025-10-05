
import React, { useState } from 'react';
import type { Scenario } from '../types';
import { THEME_COLORS } from '../constants/theme';

interface QuizProps {
  scenario: Scenario;
  onCorrectAnswer: () => void;
}

const Quiz: React.FC<QuizProps> = ({ scenario, onCorrectAnswer }) => {
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const quiz = scenario.quiz[0]; // Assuming one question per scenario for simplicity

  const handleAnswerSelect = (index: number) => {
    if (showResult) return;
    setSelectedAnswer(index);
    setShowResult(true);
    if (index === quiz.correctAnswerIndex) {
      onCorrectAnswer();
    }
  };

  const getButtonClass = (index: number) => {
    if (!showResult) {
      return `border-accent bg-panel text-accent hover:bg-accent hover:text-panel`;
    }
    if (index === quiz.correctAnswerIndex) {
      return `border-green-500 bg-green-500 text-panel`;
    }
    if (index === selectedAnswer) {
      return `border-danger bg-danger text-panel`;
    }
    return `border-panel bg-panel text-textMuted`;
  };

  return (
    <div className="w-full max-w-2xl p-4 animate-fade-in">
      <h3 className="text-2xl font-bold mb-4 text-center" style={{ color: THEME_COLORS.accent }}>Knowledge Check</h3>
      <p className="text-lg mb-6 text-center" style={{ color: THEME_COLORS.text }}>{quiz.question}</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {quiz.options.map((option, index) => (
          <button
            key={index}
            onClick={() => handleAnswerSelect(index)}
            disabled={showResult}
            className={`p-4 border-2 text-left transition-all duration-300 ${getButtonClass(index)}`}
          >
            {option}
          </button>
        ))}
      </div>
      {showResult && (
        <div className="mt-6 p-4 border-2 animate-fade-in" style={{ borderColor: selectedAnswer === quiz.correctAnswerIndex ? 'rgb(34 197 94)' : THEME_COLORS.danger, backgroundColor: THEME_COLORS.background }}>
          <h4 className="font-bold text-lg" style={{ color: selectedAnswer === quiz.correctAnswerIndex ? 'rgb(34 197 94)' : THEME_COLORS.danger }}>
            {selectedAnswer === quiz.correctAnswerIndex ? 'Correct!' : 'Not Quite!'}
          </h4>
          <p className="mt-2" style={{ color: THEME_COLORS.text }}>{quiz.explanation}</p>
        </div>
      )}
    </div>
  );
};

export default Quiz;
