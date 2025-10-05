
import React from 'react';
import { THEME_COLORS } from '../constants/theme';
import { ShieldAlert } from './icons';

interface DisclaimerProps {
  onAccept: () => void;
}

const Disclaimer: React.FC<DisclaimerProps> = ({ onAccept }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
      <div className="w-full max-w-lg p-6 md:p-8 border-2" style={{ backgroundColor: THEME_COLORS.background, borderColor: THEME_COLORS.accent }}>
        <div className="flex items-center mb-4">
          <ShieldAlert className="w-8 h-8 mr-4" style={{ color: THEME_COLORS.warn }} />
          <h2 className="text-2xl font-bold" style={{ color: THEME_COLORS.accent }}>Educator & Student Notice</h2>
        </div>
        <div className="space-y-4 text-gray-300">
          <p>This is an educational tool designed for learning purposes only.</p>
          <p>All scenarios, commands, and visuals are <span className="font-bold" style={{ color: THEME_COLORS.warn }}>fictional and simplified</span>. They do not represent real-world hacking techniques and must not be used for any malicious activity.</p>
          <p>The goal is to promote understanding of cybersecurity concepts in a safe, controlled, and ethical environment.</p>
        </div>
        <button
          onClick={onAccept}
          className="w-full mt-8 p-3 text-lg font-bold border-2 transition-all duration-200"
          style={{
            backgroundColor: THEME_COLORS.accent,
            color: THEME_COLORS.background,
            borderColor: THEME_COLORS.accent,
          }}
        >
          I Understand and Agree
        </button>
      </div>
    </div>
  );
};

export default Disclaimer;
