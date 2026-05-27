import React from 'react';
import { Zap } from 'lucide-react';
import TiltCard from '../animations/TiltCard';

const SkillsSection = ({ skills }) => {
  if (!skills || skills.length === 0) return null;

  const getStyleForLevel = (level) => {
    switch(level) {
      case 'Advanced': return 'bg-brand-500/20 border-brand-400 text-brand-400 shadow-[0_0_10px_rgba(14,165,233,0.3)]';
      case 'Intermediate': return 'bg-surface border-border text-main';
      default: return 'bg-transparent border-border border-dashed text-muted';
    }
  };

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold text-main flex items-center gap-2 px-2">
        <Zap className="text-brand-400" /> Technical Arsenal
      </h3>
      <TiltCard className="p-6 flex flex-wrap gap-3 bg-surface border border-border">
        {skills.map(skill => (
          <div 
            key={skill.name} 
            className={`px-4 py-2 rounded-xl border flex flex-col items-center justify-center transition-all ${getStyleForLevel(skill.level)}`}
          >
            <span className="font-bold">{skill.name}</span>
            <span className="text-[10px] uppercase tracking-wider opacity-70">{skill.level}</span>
          </div>
        ))}
      </TiltCard>
    </div>
  );
};

export default SkillsSection;
