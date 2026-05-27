import React from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import { Code2 } from 'lucide-react';
import TiltCard from '../animations/TiltCard';

const COLORS = ['#0ea5e9', '#38bdf8', '#7dd3fc', '#bae6fd', '#e0f2fe'];

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-surface backdrop-blur-md border border-slate-700/50 p-3 rounded-xl shadow-float">
        <p className="text-white font-medium">{payload[0].name}</p>
        <p className="text-brand-400 text-sm">
          {payload[0].value.toLocaleString()} Bytes
        </p>
      </div>
    );
  }
  return null;
};

const LanguageChart = ({ stats }) => {
  // Convert stats object to array for Recharts
  const data = Object.keys(stats)
    .sort((a, b) => stats[b] - stats[a])
    .slice(0, 5) // Top 5 languages
    .map(key => ({
      name: key,
      value: stats[key]
    }));

  if (data.length === 0) return null;

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold text-white flex items-center gap-2 px-2">
        <Code2 className="text-brand-400" /> Language Distribution
      </h3>
      <TiltCard className="p-6 h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              paddingAngle={5}
              dataKey="value"
              stroke="none"
              // Disable Recharts animation to prevent issues with html2pdf rendering
              isAnimationActive={false} 
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
          </PieChart>
        </ResponsiveContainer>
        
        {/* Legend */}
        <div className="flex flex-wrap justify-center gap-3 mt-4">
          {data.map((entry, index) => (
            <div key={entry.name} className="flex items-center gap-1.5 text-xs text-slate-300">
              <span 
                className="w-2 h-2 rounded-full" 
                style={{ backgroundColor: COLORS[index % COLORS.length] }}
              ></span>
              {entry.name}
            </div>
          ))}
        </div>
      </TiltCard>
    </div>
  );
};

export default LanguageChart;
