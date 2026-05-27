import React from 'react';
import { GitHubCalendar } from 'react-github-calendar';
import { Activity } from 'lucide-react';
import TiltCard from '../animations/TiltCard';

const HeatmapSection = ({ username }) => {
  return (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold text-main flex items-center gap-2 px-2">
        <Activity className="text-brand-400" /> Contribution Activity
      </h3>
      <TiltCard className="p-6 flex justify-center bg-surface border border-border">
        <div className="w-full overflow-x-auto pb-2 custom-scrollbar flex justify-center">
          <GitHubCalendar 
            username={username} 
            colorScheme="dark"
            theme={{
              dark: ['transparent', 'rgba(14, 165, 233, 0.3)', 'rgba(14, 165, 233, 0.6)', 'rgba(14, 165, 233, 0.8)', '#0ea5e9']
            }}
          />
        </div>
      </TiltCard>
    </div>
  );
};

export default HeatmapSection;
