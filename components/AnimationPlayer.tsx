import React from 'react';
import { THEME_COLORS } from '../constants/theme';
import { User, Server, Database, Mail, Link, Code, Lock, Shield, ArrowRight, Folder, Unlock, Ladder, ShieldAlert, Skull } from './icons';

interface AnimationPlayerProps {
  scenarioId: string;
  frame: number;
}

const RippleEffect: React.FC<{ color: string }> = ({ color }) => (
    <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-20 h-20 animate-ripple" style={{ borderColor: color }} />
    </div>
);

const Particle: React.FC<{ style: React.CSSProperties }> = ({ style }) => (
    <div className="absolute w-1.5 h-1.5" style={style} />
);

const ParticleExplosion: React.FC<{ color: string }> = ({ color }) => {
    const particles = Array.from({ length: 15 }).map(() => ({
        top: '50%',
        left: '50%',
        backgroundColor: color,
        clipPath: Math.random() > 0.5 
            ? 'polygon(50% 0%, 0% 100%, 100% 100%)' // triangle
            : 'none', // square
        animation: `particle-burst ${0.6 + Math.random() * 0.5}s ease-out forwards`,
        transform: `rotate(${Math.random() * 360}deg) translate(${Math.random() * 20}px)`,
    }));

    return (
        <div className="absolute inset-0">
            {particles.map((style, i) => <Particle key={i} style={style} />)}
        </div>
    );
};

const BaseNode: React.FC<{ label: string; icon: React.ReactNode; color?: string; compromised?: boolean, className?: string, children?: React.ReactNode }> = ({ label, icon, color, compromised, className, children }) => {
    const nodeColor = compromised ? THEME_COLORS.danger : color || THEME_COLORS.accent;
    const glowClass = compromised ? 'animate-node-glow-danger' : 'animate-node-glow';
    
    return (
      <div className={`flex flex-col items-center w-24 md:w-32 text-center transition-all duration-500 group ${className}`}>
        <div
          data-label={label}
          className={`relative w-16 h-16 md:w-20 md:h-20 border-2 flex items-center justify-center transition-all duration-500 group-hover:scale-105 ${!compromised ? 'animate-float' : ''} ${compromised ? 'animate-glitch' : ''}`}
          style={{
            borderColor: nodeColor,
            backgroundColor: THEME_COLORS.panel,
          }}
        >
          <div className={`w-full h-full ${glowClass} flex items-center justify-center transition-transform duration-300 group-hover:scale-110`}>
              {icon}
          </div>
          {children}
        </div>
        <p className="mt-2 text-xs md:text-sm font-semibold transition-colors duration-300 group-hover:text-accent" style={{ color: color || THEME_COLORS.text }}>{label}</p>
      </div>
    );
};

const SqlInjectionAnimation: React.FC<{ frame: number }> = ({ frame }) => {
  const queryPosition = frame >= 1 && frame <= 2 ? 'opacity-100 left-[20%] md:left-[22%]' : 'opacity-0 left-[10%]';
  const queryMove = frame === 2 ? 'translate-x-[110%] md:translate-x-[120%]' : '';
  const dbCompromised = frame >= 3;
  const dbFlipped = frame >= 3;
  
  return (
    <div className="w-full h-full flex items-center justify-around relative">
      <BaseNode label="Attacker" icon={<User className="w-10 h-10" style={{ color: THEME_COLORS.warn }} />} />
      <div className={`absolute top-1/2 -translate-y-1/2 transition-all duration-1000 ${queryPosition} ${queryMove}`}>
          <div className="p-2 border-2 text-xs md:text-sm whitespace-nowrap" style={{ backgroundColor: THEME_COLORS.background, borderColor: THEME_COLORS.warn }}>
             ' OR 1=1; --
          </div>
      </div>
      <BaseNode label="School-Web" icon={<Server className="w-10 h-10" style={{ color: THEME_COLORS.accent }} />} />
      <div className="perspective">
        <BaseNode 
          label="Database" 
          className={dbFlipped ? 'transform transition-transform duration-1000 rotate-y-[-180deg]' : 'transform transition-transform duration-1000'}
          icon={
              <div className={`w-full h-full flex items-center justify-center ${dbFlipped ? 'rotate-y-[-180deg]' : ''}`}>
                  {frame >= 4 ? <Folder className="w-10 h-10" style={{color: THEME_COLORS.danger}} /> : <Database className="w-10 h-10" style={{ color: THEME_COLORS.accent }} />}
              </div>
          }
          compromised={dbCompromised}
        >
            {frame === 3 && <ParticleExplosion color={THEME_COLORS.danger} />}
            {frame === 3 && <RippleEffect color={THEME_COLORS.danger} />}
        </BaseNode>
      </div>
       {frame === 4 && (
         <div className="absolute bottom-[25%] right-[5%] p-2 border-2 text-xs animate-fade-in" style={{backgroundColor: THEME_COLORS.background, borderColor: THEME_COLORS.danger}}>
            Private Data
         </div>
      )}
       {frame >= 5 && (
        <BaseNode label="Patched" icon={<Shield className="w-10 h-10" style={{color: THEME_COLORS.accent}}/>} />
       )}
    </div>
  );
};

const PhishingAnimation: React.FC<{ frame: number }> = ({ frame }) => {
    const emailMove = frame === 1 || frame === 2 ? 'translate-x-[110%] md:translate-x-[120%]' : '';
    const click = frame === 2;
    const fakeLogin = frame >= 3;
    const credsStolen = frame >= 4;
    return (
        <div className="w-full h-full flex items-center justify-around relative">
            <BaseNode label="Attacker" icon={<Server className="w-10 h-10" style={{color: THEME_COLORS.danger}}/>} />
             <div className={`absolute top-1/2 -translate-y-1/2 left-[20%] md:left-[22%] transition-all duration-1000 ${emailMove}`}>
                <div className="flex items-center p-2 border-2" style={{ backgroundColor: THEME_COLORS.background, borderColor: THEME_COLORS.warn }}>
                    <Mail className="w-8 h-8 mr-2"/>
                    {click && <Link className="w-8 h-8 text-danger animate-ping absolute" style={{color: THEME_COLORS.danger}}/>}
                </div>
            </div>
            <BaseNode label="Student" icon={<User className="w-10 h-10" style={{color: THEME_COLORS.accent}}/>} compromised={credsStolen}/>
            
            {credsStolen && (
                <svg className="absolute w-full h-full top-0 left-0" style={{ stroke: THEME_COLORS.danger, strokeWidth: 3, filter: `drop-shadow(0 0 5px ${THEME_COLORS.danger})` }}>
                    <path d="M 75% 50% C 60% 30%, 40% 70%, 25% 50%" fill="none" className="transition-all duration-1000" style={{strokeDasharray: 300, strokeDashoffset: frame >= 4 ? 0 : 300}}/>
                </svg>
            )}

            {fakeLogin && (
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-4 border-2 animate-fade-in z-10" style={{ backgroundColor: THEME_COLORS.background, borderColor: THEME_COLORS.danger }}>
                    <p className="text-center font-bold mb-2">Fake Login</p>
                    <input type="text" placeholder="user" className="bg-panel p-1 w-full mb-2 text-xs" style={{backgroundColor: THEME_COLORS.panel}}/>
                    <input type="password" placeholder="pass" className="bg-panel p-1 w-full text-xs" style={{backgroundColor: THEME_COLORS.panel}}/>
                </div>
            )}
        </div>
    );
};


const XssAnimation: React.FC<{ frame: number }> = ({ frame }) => {
    const commentInjected = frame >= 1;
    const adminView = frame >= 3;
    const scriptRun = frame >= 4;
    return (
        <div className="w-full h-full flex flex-col items-center justify-around relative">
            <div className="flex w-full justify-around">
                <BaseNode label="Attacker" icon={<User className="w-10 h-10" style={{color: THEME_COLORS.warn}}/>} />
                <BaseNode label="School Blog" icon={<Server className="w-10 h-10" style={{color: THEME_COLORS.accent}}/>} />
                <BaseNode label="Principal" icon={<User className="w-10 h-10" style={{color: THEME_COLORS.accent}}/>} compromised={scriptRun} />
            </div>

            {commentInjected && <ArrowRight className="w-12 h-12 absolute top-[20%] left-[28%] transition-opacity duration-500" style={{color: THEME_COLORS.warn, opacity: frame > 1 ? 0 : 1}}/>}
            {adminView && <ArrowRight className="w-12 h-12 absolute top-[20%] left-[58%] transition-opacity duration-500" style={{color: THEME_COLORS.accent, opacity: frame > 3 ? 0 : 1}}/>}
            
            <div className={`absolute top-[45%] p-3 border-2 transition-all duration-500 ${commentInjected ? 'left-[45%]' : 'left-[15%]'} ${adminView ? 'left-[75%]' : ''}`} style={{backgroundColor: THEME_COLORS.panel, borderColor: THEME_COLORS.accent}}>
                <Code className={`w-8 h-8 transition-colors duration-500`} style={{ color: commentInjected ? THEME_COLORS.warn : THEME_COLORS.accent }}/>
            </div>

            {scriptRun && <div className={`absolute top-1/2 left-[80%] -translate-y-1/2 p-4 border-2 animate-fade-in animate-shake`} style={{backgroundColor: THEME_COLORS.background, borderColor: THEME_COLORS.danger}}>Popup!</div>}
        </div>
    );
};

const DefaultCredsAnimation: React.FC<{ frame: number }> = ({ frame }) => {
    const doorOpen = frame >= 2;
    return (
        <div className="w-full h-full flex items-center justify-center relative">
            <div className="flex flex-col items-center">
                <div className="w-48 h-64 border-2 p-4 flex flex-col items-center" style={{borderColor: THEME_COLORS.accent, backgroundColor: THEME_COLORS.panel}}>
                    <p className="font-bold mb-4">Admin Panel</p>
                    <div className="w-32 h-40 border-2 relative perspective" style={{borderColor: THEME_COLORS.accent}}>
                        <div className={`w-full h-full bg-background absolute top-0 left-0 origin-left transition-transform duration-1000 preserve-3d ${doorOpen ? 'rotate-y--110' : ''}`}></div>
                         {frame >= 3 && <BaseNode label="" icon={<User className="w-10 h-10" style={{color: THEME_COLORS.danger}} />} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />}
                    </div>
                </div>
                 <div className={`mt-4 p-2 border-2 text-sm transition-opacity duration-500 ${frame === 1 ? 'opacity-100' : 'opacity-0'}`} style={{backgroundColor: THEME_COLORS.background, borderColor: THEME_COLORS.warn}}>
                    Login: admin / Pass: admin
                </div>
                {frame === 4 && <Shield className="w-16 h-16 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-fade-in" style={{color: THEME_COLORS.accent}} />}
            </div>
        </div>
    );
};

const MisconfiguredShareAnimation: React.FC<{ frame: number }> = ({ frame }) => {
    return (
        <div className="w-full h-full flex items-center justify-center relative">
            <BaseNode label="File Share" icon={<Folder className="w-10 h-10"/>} compromised={frame >= 3} />
            {frame >= 1 && (
                <div className={`absolute p-2 border-2 text-xs transition-all duration-500 ${frame >= 2 ? 'translate-x-32 -translate-y-16' : ''}`} style={{backgroundColor: THEME_COLORS.panel, borderColor: THEME_COLORS.danger}}>
                    StudentGrades.xlsx
                </div>
            )}
            {frame >= 4 && <Lock className="w-12 h-12 absolute animate-fade-in" style={{color: THEME_COLORS.accent}} />}
        </div>
    );
};

const UnpatchedServiceAnimation: React.FC<{ frame: number }> = ({ frame }) => {
    const crackPath = "M-10 -15 L0 -5 L-5 5 L10 20 L5 30 L20 45";
    return (
        <div className="w-full h-full flex items-center justify-center relative">
            <BaseNode label="Old Service" icon={<Server className="w-10 h-10"/>} compromised={frame >= 3}>
                {frame >= 1 && <ShieldAlert className="w-8 h-8 absolute -top-2 -right-2 animate-pulse" style={{color: THEME_COLORS.warn}} />}
                {frame >= 2 && (
                    <svg className="absolute w-full h-full overflow-visible">
                        <path d={crackPath} stroke={THEME_COLORS.danger} strokeWidth="2" fill="none" className="transition-all duration-1000" style={{strokeDasharray: 100, strokeDashoffset: frame === 2 ? 0 : 100}} />
                    </svg>
                )}
            </BaseNode>
            {frame >= 4 && <Shield className="w-12 h-12 absolute animate-fade-in" style={{color: THEME_COLORS.accent}} />}
        </div>
    );
};

const WeakEncryptionAnimation: React.FC<{ frame: number }> = ({ frame }) => {
    return (
        <div className="w-full h-full flex items-center justify-around relative">
            <BaseNode label="Attacker" icon={<User className="w-10 h-10" style={{color: THEME_COLORS.warn}}/>} />
            <div className="flex flex-col items-center">
                 <BaseNode label="Backup File" icon={frame >= 2 ? <Unlock className="w-10 h-10"/> : <Lock className="w-10 h-10"/>} compromised={frame >= 3}>
                    {frame === 1 && <div className="absolute inset-0 animate-pulse-danger rounded-full" />}
                </BaseNode>
                {frame >= 3 && <div className="mt-2 p-2 border-2 text-xs animate-fade-in" style={{borderColor: THEME_COLORS.danger}}>Data Leaked</div>}
            </div>
            {frame >= 4 && <Shield className="w-12 h-12 absolute animate-fade-in" style={{color: THEME_COLORS.accent}} />}
        </div>
    );
};

const PrivilegeEscalationAnimation: React.FC<{ frame: number }> = ({ frame }) => {
    const userPosition = frame === 2 ? 'translate-y-[-120px]' : frame >= 3 ? 'translate-y-[-240px]' : 'translate-y-0';
    return (
        <div className="w-full h-full flex flex-col items-center justify-end relative pb-10">
             <BaseNode label="Admin" icon={<User className="w-10 h-10"/>} compromised={frame >= 3}/>
             {frame >= 1 && <Ladder className={`w-10 h-64 absolute bottom-28 transition-opacity duration-500 ${frame >= 4 ? 'opacity-0' : 'opacity-100'}`} style={{color: THEME_COLORS.accent}}/>}
             <div className={`transition-transform duration-1000 absolute bottom-10 ${userPosition}`}>
                <BaseNode label="User" icon={<User className="w-10 h-10" style={{color: THEME_COLORS.warn}}/>}/>
             </div>
        </div>
    );
};

const LateralMovementAnimation: React.FC<{ frame: number }> = ({ frame }) => {
    return (
        <div className="w-full h-full flex items-center justify-around relative">
            <BaseNode label="Student Laptop" icon={<User className="w-8 h-8"/>} compromised={frame >= 0}/>
            <BaseNode label="Library Server" icon={<Server className="w-10 h-10"/>} compromised={frame >= 2}/>
            <BaseNode label="Admin PC" icon={<User className="w-8 h-8"/>} compromised={frame >= 3}/>
            <svg className="absolute w-full h-full top-0 left-0 overflow-visible" style={{stroke: THEME_COLORS.warn}}>
                 <path d="M 15% 50% L 45% 50%" strokeWidth="4" fill="none" className={frame >= 1 && frame < 4 ? 'edge-flow' : ''} style={{opacity: frame >= 1 && frame < 4 ? 1 : 0, transition: 'opacity 0.5s'}} />
                 <path d="M 55% 50% L 85% 50%" strokeWidth="4" fill="none" className={frame >= 3 && frame < 4 ? 'edge-flow' : ''} style={{opacity: frame >= 3 && frame < 4 ? 1 : 0, transition: 'opacity 0.5s'}} />
            </svg>
            {frame >= 4 && <div className="w-2 h-full bg-accent absolute left-1/2 -translate-x-1/2 animate-fade-in" style={{backgroundColor: THEME_COLORS.accent, boxShadow: `0 0 15px ${THEME_COLORS.accent}`}}/>}
        </div>
    );
};

const DdosAnimation: React.FC<{ frame: number }> = ({ frame }) => {
    const particleCount = frame === 1 ? 50 : 0;
    return (
        <div className="w-full h-full flex items-center justify-center relative overflow-hidden">
            {Array.from({length: particleCount}).map((_, i) => (
                <div key={i} className="w-1 h-1 bg-warn rounded-full absolute" style={{
                    top: `${Math.random() * 100}%`,
                    left: '-5%',
                    animation: `fly-to-center 1s linear ${Math.random() * 1.5}s forwards`,
                    animationPlayState: frame >= 2 ? 'paused' : 'running'
                }} />
            ))}
            <style>{`
                @keyframes fly-to-center {
                    0% { transform: translate(0, 0); opacity: 1; }
                    100% { transform: translate(40vw, calc(50vh - 50%)); opacity: 0; }
                }
            `}</style>
            <BaseNode label="School Website" icon={<Server className="w-10 h-10"/>} compromised={frame >= 2}/>
            {frame >= 4 && <Shield className="w-24 h-24 absolute animate-fade-in" style={{color: THEME_COLORS.accent, filter: `drop-shadow(0 0 10px ${THEME_COLORS.accent})`}}/>}
        </div>
    );
};

const TotalCompromiseAnimation: React.FC<{ frame: number }> = ({ frame }) => {
    return (
        <div className="w-full h-full relative overflow-hidden">
            <BaseNode label="Student Laptop" icon={<User className="w-8 h-8"/>} compromised={frame >= 1} className="absolute top-[20%] left-[15%]">
                {frame === 1 && <ParticleExplosion color={THEME_COLORS.danger} />}
            </BaseNode>
            <BaseNode label="Library Server" icon={<Server className="w-10 h-10"/>} compromised={frame >= 2} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                {frame === 2 && <ParticleExplosion color={THEME_COLORS.danger} />}
            </BaseNode>
            <BaseNode label="Admin PC" icon={<User className="w-8 h-8"/>} compromised={frame >= 3} className="absolute top-[20%] right-[15%]">
                {frame === 3 && <ParticleExplosion color={THEME_COLORS.danger} />}
            </BaseNode>
             <BaseNode label="Mainframe" icon={<Skull className="w-10 h-10"/>} compromised={frame >= 4} className="absolute bottom-[15%] left-1/2 -translate-x-1/2">
                {frame === 4 && <ParticleExplosion color={THEME_COLORS.danger} />}
                {frame === 4 && <RippleEffect color={THEME_COLORS.danger} />}
             </BaseNode>

            <svg className="absolute w-full h-full top-0 left-0 overflow-visible" style={{stroke: THEME_COLORS.danger, filter: `drop-shadow(0 0 5px ${THEME_COLORS.danger})`}}>
                 <path d="M 22% 28% C 30% 40%, 40% 45%, 48% 48%" strokeWidth="3" fill="none" className={frame >= 2 && frame < 5 ? 'edge-flow' : ''} style={{opacity: frame >= 2 && frame < 5 ? 1 : 0, transition: 'opacity 0.5s'}} />
                 <path d="M 52% 52% C 60% 45%, 70% 40%, 78% 28%" strokeWidth="3" fill="none" className={frame >= 3 && frame < 5 ? 'edge-flow' : ''} style={{opacity: frame >= 3 && frame < 5 ? 1 : 0, transition: 'opacity 0.5s'}} />
                  <path d="M 80% 28% C 70% 50%, 60% 70%, 52% 80%" strokeWidth="3" fill="none" className={frame >= 4 && frame < 5 ? 'edge-flow' : ''} style={{opacity: frame >= 4 && frame < 5 ? 1 : 0, transition: 'opacity 0.5s'}} />
            </svg>

            {frame >= 4 && Array.from({length: 80}).map((_, i) => (
                <div key={i} className="w-1 h-1 bg-warn rounded-full absolute" style={{
                    top: `${Math.random() * 100}%`,
                    left: `${Math.random() * 20 - 10}%`,
                    animation: `fly-to-center 1s linear ${Math.random() * 0.5}s forwards`,
                }} />
            ))}
             {frame >= 5 && <Shield className="w-24 h-24 absolute animate-fade-in" style={{color: THEME_COLORS.accent, filter: `drop-shadow(0 0 10px ${THEME_COLORS.accent})`}}/>}
        </div>
    );
};


const AnimationPlayer: React.FC<AnimationPlayerProps> = ({ scenarioId, frame }) => {
  const cinematicZoom = scenarioId === 'total-compromise' && frame >= 4;
  
  const animationContent = () => {
    switch (scenarioId) {
      case 'sql-injection':
        return <SqlInjectionAnimation frame={frame} />;
      case 'phishing':
        return <PhishingAnimation frame={frame} />;
      case 'xss':
          return <XssAnimation frame={frame}/>;
      case 'default-creds':
          return <DefaultCredsAnimation frame={frame}/>;
      case 'misconfigured-share':
          return <MisconfiguredShareAnimation frame={frame}/>;
      case 'unpatched-service':
          return <UnpatchedServiceAnimation frame={frame}/>;
      case 'weak-encryption':
          return <WeakEncryptionAnimation frame={frame}/>;
      case 'privilege-escalation':
          return <PrivilegeEscalationAnimation frame={frame}/>;
      case 'lateral-movement':
          return <LateralMovementAnimation frame={frame}/>;
      case 'ddos':
          return <DdosAnimation frame={frame}/>;
      case 'total-compromise':
          return <TotalCompromiseAnimation frame={frame}/>;
      default:
        return <div className="text-center">
          <Shield className="w-24 h-24 mx-auto mb-4" style={{ color: THEME_COLORS.accent }} />
          <p className="font-bold">{scenarioId}</p>
          <p>Animation coming soon!</p>
          <p className="text-sm text-gray-500">Frame: {frame}</p>
        </div>;
    }
  };

  return (
    <div className={`w-full h-full transition-transform duration-1000 ${cinematicZoom ? 'scale-110' : ''}`}>
        {animationContent()}
    </div>
  );
};

export default AnimationPlayer;