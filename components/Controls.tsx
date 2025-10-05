import React from 'react';
import { RefreshCw, ChevronLeft, ChevronRight } from './icons';
import { THEME_COLORS } from '../constants/theme';

interface ControlsProps {
  isFinished: boolean;
  onNext: () => void;
  onPrev: () => void;
  maxSteps: number;
  currentStep: number;
}

// FIX: Added style prop to allow for style overrides on the button.
const ControlButton: React.FC<{ onClick: () => void; children: React.ReactNode; disabled?: boolean; className?: string; style?: React.CSSProperties; }> = ({ onClick, children, disabled, className, style }) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className={`py-3 px-4 border-2 transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed flex-1 flex items-center justify-center font-bold text-sm ${className}`}
    style={{
      backgroundColor: THEME_COLORS.panel,
      borderColor: THEME_COLORS.accent,
      color: THEME_COLORS.accent,
      ...style,
    }}
  >
    {children}
  </button>
);


const Controls: React.FC<ControlsProps> = ({ isFinished, onNext, onPrev, maxSteps, currentStep }) => {
  return (
    <div className="p-4 border-t-2" style={{ borderColor: THEME_COLORS.panel }}>
      <div className="flex items-center justify-between space-x-2">
        <ControlButton onClick={onPrev} disabled={currentStep === 0}>
          <ChevronLeft className="w-5 h-5 mr-2" />
          Previous
        </ControlButton>

        <ControlButton onClick={onNext} disabled={isFinished} style={{ backgroundColor: THEME_COLORS.accent, color: THEME_COLORS.background}}>
          Next Step
          <ChevronRight className="w-5 h-5 ml-2" />
        </ControlButton>
      </div>

      <div className="mt-4">
        <div className="w-full h-2" style={{backgroundColor: THEME_COLORS.background}}>
            <div className="h-full" style={{width: `${(currentStep / maxSteps) * 100}%`, backgroundColor: THEME_COLORS.accent, transition: 'width 0.3s ease'}}></div>
        </div>
        <div className="text-center text-xs mt-2" style={{color: THEME_COLORS.textMuted}}>
            Step {currentStep + 1} / {maxSteps + 1}
        </div>
      </div>
    </div>
  );
};

export default Controls;