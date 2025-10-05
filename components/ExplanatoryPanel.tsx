
import React from 'react';
import { THEME_COLORS } from '../constants/theme';
import { BookOpen, HelpCircle } from './icons';

// A simple function to highlight keywords
const highlightKeywords = (text: string) => {
    const keywords = [
        'SQL Injection', 'database', 'compromised', 'mitigation', 'parameterized queries',
        'Phishing', 'credentials', 'MFA', 'XSS', 'script', 'Output Encoding',
        'Default Credentials', 'admin:admin', 'Misconfigured', 'Least Privilege',
        'Unpatched', 'vulnerability', 'Patch Management', 'Weak Encryption',
        'Privilege Escalation', 'Lateral Movement', 'segmentation', 'DDoS', 'Rate Limiting',
        'CRITICAL', 'VULNERABILITY', 'un-sanitized'
    ];
    // Create a regex from the keywords
    const regex = new RegExp(`\\b(${keywords.join('|')})\\b`, 'gi');
    
    // Split the text by the regex, keeping the delimiters
    const parts = text.split(regex);

    return parts.map((part, index) => 
        keywords.some(kw => new RegExp(`^${kw}$`, 'i').test(part)) ? 
        <span key={index} className="font-bold animate-glow" style={{ color: THEME_COLORS.warn }}>{part}</span> : 
        part
    );
};

interface ExplanatoryPanelProps {
  narration: string;
  hint: string;
}

const ExplanatoryPanel: React.FC<ExplanatoryPanelProps> = ({ narration, hint }) => {
  return (
    <div className="w-full h-full p-6" key={narration}>
        <h2 className="text-xl font-bold mb-6" style={{ color: THEME_COLORS.accent }}>// Attack Analysis</h2>
        <div className="space-y-8">
            <div className="animate-fade-in">
                <div className="flex items-center mb-2">
                    <BookOpen className="w-5 h-5 mr-3 flex-shrink-0" style={{ color: THEME_COLORS.accent }}/>
                    <h3 className="font-bold text-lg" style={{ color: THEME_COLORS.accent }}>Narration</h3>
                </div>
                <p className="text-base pl-8" style={{ color: THEME_COLORS.text }}>{highlightKeywords(narration)}</p>
            </div>
            <div className="animate-fade-in" style={{ animationDelay: '150ms' }}>
                 <div className="flex items-center mb-2">
                    <HelpCircle className="w-5 h-5 mr-3 flex-shrink-0" style={{ color: THEME_COLORS.warn }}/>
                    <h3 className="font-bold text-lg" style={{ color: THEME_COLORS.warn }}>Hint</h3>
                </div>
                <p className="text-base pl-8" style={{ color: THEME_COLORS.text }}>{highlightKeywords(hint)}</p>
            </div>
        </div>
    </div>
  );
};

export default ExplanatoryPanel;
