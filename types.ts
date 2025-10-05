
export interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswerIndex: number;
  explanation: string;
}

export interface Frame {
  narration: string;
  onScreenText: string;
  hint: string;
  duration: number; // in ms
  logMessage?: string;
  healthImpact?: number; // e.g., -1 for attack, 1 for mitigation
}

export interface Scenario {
  id: string;
  title: string;
  learningObjective: string;
  storyboard: Frame[];
  teacherCue: string;
  quiz: QuizQuestion[];
  // A property to help AnimationPlayer select the correct animation component
  animationComponent: string;
  badgeName: string;
}