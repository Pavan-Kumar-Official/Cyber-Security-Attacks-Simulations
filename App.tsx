
import React, { useState, useEffect } from 'react';
import { SCENARIOS } from './constants/scenarios';
import type { Scenario } from './types';
import CyberScenarioViewer from './components/CyberScenarioViewer';
import Disclaimer from './components/Disclaimer';
import { THEME_COLORS } from './constants/theme';
import { Badge } from './components/icons';

// --- Particle Component for Badge Notification ---
const Particle: React.FC<{ style: React.CSSProperties }> = ({ style }) => (
    <div className="absolute w-1 h-1 rounded-full" style={style} />
);

// --- Enhanced Badge Notification Component ---
interface BadgeNotificationProps {
    badgeName: string | null;
    onClose: () => void;
}

const BadgeNotification: React.FC<BadgeNotificationProps> = ({ badgeName, onClose }) => {
    const [visible, setVisible] = useState(false);
    const [particles, setParticles] = useState<React.CSSProperties[]>([]);
    
    useEffect(() => {
        if (badgeName) {
            setVisible(true);
            
            // Create particle effects
            const newParticles: React.CSSProperties[] = Array.from({ length: 20 }).map(() => ({
                top: '50%',
                left: '50%',
                backgroundColor: Math.random() > 0.5 ? THEME_COLORS.accent : THEME_COLORS.warn,
                animation: `particle-burst ${0.5 + Math.random() * 0.8}s ease-out forwards`,
                transform: `rotate(${Math.random() * 360}deg) translateX(20px)`,
            }));
            setParticles(newParticles);

            const timer = setTimeout(() => {
                setVisible(false);
                setTimeout(onClose, 500); 
            }, 4000);
            return () => clearTimeout(timer);
        }
    }, [badgeName, onClose]);

    if (!badgeName) return null;

    return (
        <div className={`fixed top-10 left-1/2 -translate-x-1/2 p-4 border-2 flex items-center z-50 transition-all duration-500 ${visible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 -translate-y-5 scale-90'}`} style={{ backgroundColor: THEME_COLORS.panel, borderColor: THEME_COLORS.accent }}>
            <div className="relative">
                {particles.map((style, i) => <Particle key={i} style={style} />)}
            </div>
            <Badge className="w-8 h-8 mr-4" style={{ color: THEME_COLORS.accent }} />
            <div>
                <p className="font-bold" style={{ color: THEME_COLORS.accent }}>Badge Unlocked!</p>
                <p style={{color: THEME_COLORS.text}}>{badgeName}</p>
            </div>
        </div>
    );
};


const App: React.FC = () => {
  const [selectedScenario, setSelectedScenario] = useState<Scenario | null>(null);
  const [showDisclaimer, setShowDisclaimer] = useState(true);
  const [unlockedBadge, setUnlockedBadge] = useState<string | null>(null);


  const handleScenarioSelect = (scenario: Scenario) => {
    setSelectedScenario(scenario);
  };

  const handleDisclaimerAccept = () => {
    setShowDisclaimer(false);
  };

  const handleBadgeUnlock = (badgeName: string) => {
    setUnlockedBadge(badgeName);
  };

  return (
    <div className="min-h-screen font-mono" style={{ backgroundColor: THEME_COLORS.background }}>
      {showDisclaimer && <Disclaimer onAccept={handleDisclaimerAccept} />}
      <BadgeNotification badgeName={unlockedBadge} onClose={() => setUnlockedBadge(null)} />

      <div className={`flex flex-col md:flex-row h-screen transition-opacity duration-500 ${showDisclaimer ? 'opacity-20 blur-sm' : 'opacity-100'}`}>
        <aside className="w-full md:w-1/4 lg:w-1/5 p-4 md:p-6 border-r-2 border-panel overflow-y-auto" style={{ backgroundColor: THEME_COLORS.background, borderColor: THEME_COLORS.panel }}>
          <header className="mb-6">
            <h1 className="text-2xl font-bold" style={{ color: THEME_COLORS.accent }}>CyberSim</h1>
            <p className="text-sm text-gray-400">Animated Learning Modules</p>
          </header>
          <nav>
            <ul>
              {SCENARIOS.map((scenario, index) => (
                <li key={scenario.id} className="mb-2">
                  <button
                    onClick={() => handleScenarioSelect(scenario)}
                    className={`w-full text-left p-3 text-sm rounded-none border-2 transition-all duration-200 ${selectedScenario?.id === scenario.id ? 'font-bold' : 'border-transparent hover:border-accent'}`}
                    style={{ 
                      backgroundColor: selectedScenario?.id === scenario.id ? THEME_COLORS.accent : THEME_COLORS.panel,
                      color: selectedScenario?.id === scenario.id ? THEME_COLORS.background : THEME_COLORS.accent,
                      borderColor: selectedScenario?.id === scenario.id ? THEME_COLORS.accent : 'transparent'
                    }}
                  >
                    <span className="mr-2 text-gray-400">{String(index + 1).padStart(2, '0')}</span>
                    {scenario.title}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </aside>
        <main className="flex-1">
          {selectedScenario ? (
            <CyberScenarioViewer scenario={selectedScenario} key={selectedScenario.id} onBadgeUnlock={handleBadgeUnlock} />
          ) : (
            <div className="text-center h-full flex flex-col items-center justify-center">
              <h2 className="text-3xl font-bold" style={{ color: THEME_COLORS.accent }}>Welcome!</h2>
              <p className="mt-2 text-gray-400">Select a cybersecurity scenario from the left to begin.</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default App;