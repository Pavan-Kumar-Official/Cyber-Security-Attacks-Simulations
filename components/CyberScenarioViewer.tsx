import React, { useState, useEffect, useRef } from 'react';
import type { Scenario } from '../types';
import { useAnimation } from '../hooks/useAnimation';
import Controls from './Controls';
import Quiz from './Quiz';
import AnimationPlayer from './AnimationPlayer';
import ExplanatoryPanel from './ExplanatoryPanel';
import { THEME_COLORS } from '../constants/theme';
import { HeartPulse, Play, Pause, RefreshCw } from './icons';

// --- Start of in-file components ---

const ControlButton: React.FC<{ onClick: () => void; children: React.ReactNode; disabled?: boolean; className?: string; }> = ({ onClick, children, disabled, className }) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className={`p-3 border-2 transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center ${className}`}
    style={{
      backgroundColor: THEME_COLORS.panel,
      borderColor: THEME_COLORS.accent,
      color: THEME_COLORS.accent,
    }}
  >
    {children}
  </button>
);

const NetworkHealth: React.FC<{ health: number }> = ({ health }) => {
    const getHealthColor = () => {
        if (health > 75) return THEME_COLORS.accent;
        if (health > 40) return THEME_COLORS.warn;
        return THEME_COLORS.danger;
    };

    return (
        <div className="w-full md:w-48 flex items-center">
            <HeartPulse className="w-6 h-6 mr-2 flex-shrink-0" style={{ color: getHealthColor() }} />
            <div className="w-full h-4 border-2" style={{ backgroundColor: THEME_COLORS.background, borderColor: THEME_COLORS.panel }}>
                <div className="h-full transition-all duration-500" style={{ width: `${health}%`, backgroundColor: getHealthColor() }} />
            </div>
            <span className="ml-3 font-bold text-lg" style={{ color: getHealthColor() }}>{health}%</span>
        </div>
    );
};

const TopBar: React.FC<{
  scenario: Scenario;
  health: number;
  isPlaying: boolean;
  isFinished: boolean;
  onPlay: () => void;
  onPause: () => void;
  onReset: () => void;
  animationMode: 'auto' | 'step';
  setAnimationMode: (mode: 'auto' | 'step') => void;
}> = ({ scenario, health, isPlaying, isFinished, onPlay, onPause, onReset, animationMode, setAnimationMode }) => {
    
    const ModeButton: React.FC<{ active: boolean; onClick: () => void; children: React.ReactNode }> = ({ active, onClick, children }) => (
        <button
            onClick={onClick}
            className={`px-3 py-2 border-2 text-xs font-bold transition-all duration-200 w-1/2 ${
                active
                    ? `text-background`
                    : `text-accent border-transparent hover:border-accent`
            }`}
            style={{
                backgroundColor: active ? THEME_COLORS.accent : THEME_COLORS.panel,
            }}
        >
            {children}
        </button>
    );

    return (
        <header className="p-3 border-b-2 flex flex-col md:flex-row justify-between items-start md:items-center gap-4" style={{ borderColor: THEME_COLORS.accent, backgroundColor: THEME_COLORS.background }}>
            <div className="flex-1">
                <h2 className="text-lg font-bold" style={{ color: THEME_COLORS.accent }}>{scenario.title}</h2>
                <p className="text-xs hidden lg:block" style={{ color: THEME_COLORS.textMuted }}>{scenario.learningObjective}</p>
            </div>
            <div className="flex items-center space-x-3">
                <NetworkHealth health={health} />
                <div className="flex w-48 border-2" style={{ borderColor: THEME_COLORS.panel }}>
                    <ModeButton active={animationMode === 'auto'} onClick={() => setAnimationMode('auto')}>Auto-Play</ModeButton>
                    <ModeButton active={animationMode === 'step'} onClick={() => setAnimationMode('step')}>Step-by-Step</ModeButton>
                </div>
                {isPlaying ? (
                    <ControlButton onClick={onPause}><Pause className="w-5 h-5" /></ControlButton>
                ) : (
                    <ControlButton onClick={onPlay} disabled={isFinished}><Play className="w-5 h-5" /></ControlButton>
                )}
                <ControlButton onClick={onReset}><RefreshCw className="w-5 h-5" /></ControlButton>
            </div>
        </header>
    );
};


const Typewriter: React.FC<{ text: string }> = ({ text }) => {
    const [displayedText, setDisplayedText] = useState('');

    useEffect(() => {
        setDisplayedText('');
        let i = 0;
        if (text) {
            const interval = setInterval(() => {
                if (i < text.length) {
                    setDisplayedText(prev => prev + text.charAt(i));
                    i++;
                } else {
                    clearInterval(interval);
                }
            }, 20); // ms per character

            return () => clearInterval(interval);
        }
    }, [text]);

    const getLogColor = (log: string) => {
        if (log.includes('!! ERROR') || log.includes('CRITICAL')) return THEME_COLORS.danger;
        if (log.includes('Mitigation')) return THEME_COLORS.accent;
        return THEME_COLORS.textMuted;
    }

    return <span style={{ color: getLogColor(text) }}>{displayedText}<span className="inline-block w-2 h-3 bg-accent animate-ping ml-1"></span></span>;
};

interface LogPanelProps {
    logs: string[];
}

const LogPanel: React.FC<LogPanelProps> = ({ logs }) => {
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [logs]);

    return (
        <div className="absolute bottom-4 left-4 w-full max-w-sm h-40 p-2 border-2 text-xs font-mono z-20 hidden md:block" style={{ backgroundColor: 'rgba(11, 12, 15, 0.8)', borderColor: THEME_COLORS.panel, backdropFilter: 'blur(2px)' }}>
            <div className="font-bold mb-1" style={{ color: THEME_COLORS.accent }}>>_ Mission Log</div>
            <div ref={scrollRef} className="h-[calc(100%-20px)] overflow-y-auto pr-2">
                {logs.slice(0, -1).map((log, i) => <div key={i} style={{ color: THEME_COLORS.textMuted }}>{log}</div>)}
                {logs.length > 0 && <Typewriter text={logs[logs.length - 1]} />}
            </div>
        </div>
    );
};

// --- End of in-file components ---

interface CyberScenarioViewerProps {
  scenario: Scenario;
  onBadgeUnlock: (badgeName: string) => void;
}

const CyberScenarioViewer: React.FC<CyberScenarioViewerProps> = ({ scenario, onBadgeUnlock }) => {
  const [animationMode, setAnimationMode] = useState<'auto' | 'step'>('auto');
  const [logs, setLogs] = useState<string[]>([]);
  const [health, setHealth] = useState(100);
  const maxHealth = 100;
  
  const {
    currentFrameIndex,
    isPlaying,
    isFinished,
    play,
    pause,
    reset,
    nextStep,
    prevStep,
  } = useAnimation(scenario.storyboard, animationMode);

  const [showQuiz, setShowQuiz] = useState(false);
  const currentFrame = scenario.storyboard[currentFrameIndex];

  useEffect(() => {
    reset();
    setShowQuiz(false);
    setAnimationMode('auto');
    setLogs([]);
    setHealth(100);
  }, [scenario, reset]);
  
  useEffect(() => {
    const frame = scenario.storyboard[currentFrameIndex];
    if (frame?.logMessage && !logs.includes(frame.logMessage)) {
      setLogs(prevLogs => [...prevLogs, frame.logMessage as string]);
    }
    if(frame?.healthImpact) {
        setHealth(prev => Math.max(0, Math.min(maxHealth, prev + frame.healthImpact * 10)));
    }
  }, [currentFrameIndex, scenario.storyboard, logs]);

  useEffect(() => {
    if (isFinished) {
      setShowQuiz(true);
    }
  }, [isFinished]);

  return (
    <div className="w-full h-full flex flex-col" style={{ backgroundColor: THEME_COLORS.panel }}>
      <TopBar
        scenario={scenario}
        health={health}
        isPlaying={isPlaying}
        isFinished={isFinished}
        onPlay={play}
        onPause={pause}
        onReset={reset}
        animationMode={animationMode}
        setAnimationMode={setAnimationMode}
      />
      
      <div className="flex-grow flex flex-col lg:flex-row min-h-0">
        {/* Left Panel: Animation */}
        <div className="flex-grow lg:w-[70%] p-4 md:p-8 flex items-center justify-center relative min-h-[300px] md:min-h-[400px] animation-bg">
          {showQuiz ? (
              <Quiz scenario={scenario} onCorrectAnswer={() => onBadgeUnlock(scenario.badgeName)} />
          ) : (
              <>
                <AnimationPlayer scenarioId={scenario.id} frame={currentFrameIndex} />
                <LogPanel logs={logs} />
              </>
          )}
        </div>

        {/* Right Panel: Explanation & Step Controls */}
        <div className="lg:w-[30%] border-t-2 lg:border-t-0 lg:border-l-2 flex flex-col" style={{ borderColor: THEME_COLORS.accent, backgroundColor: THEME_COLORS.background }}>
           {!showQuiz && (
            <>
              <ExplanatoryPanel narration={currentFrame.narration} hint={currentFrame.hint} />
              <div className="mt-auto">
                <Controls
                  isFinished={isFinished}
                  onNext={nextStep}
                  onPrev={prevStep}
                  maxSteps={scenario.storyboard.length - 1}
                  currentStep={currentFrameIndex}
                />
              </div>
            </>
           )}
        </div>
      </div>
    </div>
  );
};

export default CyberScenarioViewer;
