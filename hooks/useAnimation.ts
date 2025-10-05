
import { useState, useEffect, useRef, useCallback } from 'react';
import type { Frame } from '../types';

export const useAnimation = (storyboard: Frame[], animationMode: 'auto' | 'step') => {
  const [currentFrameIndex, setCurrentFrameIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const timerRef = useRef<number | null>(null);

  const isFinished = currentFrameIndex >= storyboard.length - 1;

  const clearTimer = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const play = useCallback(() => {
    if (isFinished || animationMode !== 'auto') return;
    setIsPlaying(true);
  }, [isFinished, animationMode]);

  const pause = useCallback(() => {
    setIsPlaying(false);
    clearTimer();
  }, [clearTimer]);

  const nextStep = useCallback(() => {
    clearTimer(); // Stop the timer for the current frame
    if (!isFinished) {
      setCurrentFrameIndex(prev => prev + 1);
    }
    // This no longer calls pause(), so it won't stop autoplay when skipping forward.
  }, [isFinished, clearTimer]);

  const prevStep = useCallback(() => {
    pause();
    setCurrentFrameIndex(prev => Math.max(0, prev - 1));
  }, [pause]);

  const reset = useCallback(() => {
    pause();
    setCurrentFrameIndex(0);
  }, [pause]);

  useEffect(() => {
    if (isPlaying && animationMode === 'auto' && !isFinished) {
      const currentFrame = storyboard[currentFrameIndex];
      timerRef.current = window.setTimeout(() => {
        setCurrentFrameIndex(prev => prev + 1);
      }, currentFrame.duration);
    } else if (isFinished) {
        setIsPlaying(false);
    }

    return () => {
      clearTimer();
    };
  }, [isPlaying, currentFrameIndex, storyboard, isFinished, animationMode, clearTimer]);
  
  // Effect to pause when switching to step mode
  useEffect(() => {
      if (animationMode === 'step') {
          pause();
      }
  }, [animationMode, pause]);

  // Ensure we stop playing if the storyboard changes
  useEffect(() => {
      reset();
      // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [storyboard]);

  return {
    currentFrameIndex,
    isPlaying,
    isFinished,
    play,
    pause,
    reset,
    nextStep,
    prevStep,
  };
};
