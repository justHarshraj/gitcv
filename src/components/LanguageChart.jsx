import React from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import { Code2 } from 'lucide-react';
import TiltCard from '../animations/TiltCard';

const COLORS = ['#3b82f6', '#60a5fa', '#93c5fd', '#bfdbfe', '#dbeafe'];

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-surface backdrop-blur-md border border-border p-3 rounded-xl shadow-float z-50">
        <p className="text-main font-medium">{payload[0].name}</p>
        <p className="text-brand-400 text-sm">
          {payload[0].value.toLocaleString()} Bytes
        </p>
      </div>
    );
  }
  return null;
};

const LanguageChart = ({ stats }) => {
  const data = Object.keys(stats)
    .sort((a, b) => stats[b] - stats[a])
    .slice(0, 5)
    .map(key => ({ name: key, value: stats[key] }));

  if (data.length === 0) return null;

  return (
    <div className="space-y-4 h-full">
      <h3 className="text-xl font-semibold text-main flex items-center gap-2 px-2">
        <Code2 className="text-brand-400" /> Language Distribution
      </h3>
      
      {/* 1. Changed to flex-col and min-h to allow perfect internal spacing */}
      <TiltCard className="p-6 flex flex-col justify-between min-h-[340px]">
        
        {/* 2. Constrained the chart wrapper to a fixed height so it doesn't push the legend out */}
        <div className="w-full h-[200px] flex items-center justify-center">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie 
                data={data} 
                cx="50%" 
                cy="50%" 
                innerRadius={65} 
                outerRadius={85} 
                paddingAngle={5} 
                dataKey="value" 
                stroke="none" 
                isAnimationActive={false}
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} cursor={{fill: 'transparent'}} />
            </PieChart>
          </ResponsiveContainer>
        </div>
        
        {/* 3. Added top padding and a subtle border to separate the legend from the pie chart perfectly */}
        <div className="flex flex-wrap justify-center gap-4 mt-4 pt-4 border-t border-border/50">
          {data.map((entry, index) => (
            <div key={entry.name} className="flex items-center gap-1.5 text-xs font-medium text-muted">
              <span 
                className="w-2.5 h-2.5 rounded-full" 
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
