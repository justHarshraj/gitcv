import React from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import { Code2 } from 'lucide-react';
import TiltCard from '../animations/TiltCard';

// Updated colors to match the blue branding better
const COLORS = ['#3b82f6', '#60a5fa', '#93c5fd', '#bfdbfe', '#dbeafe'];

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-surface backdrop-blur-md border border-border p-3 rounded-xl shadow-float">
        {/* text-main replaces text-white */}
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
    <div className="space-y-4">
      {/* text-main replaces text-white */}
      <h3 className="text-xl font-semibold text-main flex items-center gap-2 px-2">
        <Code2 className="text-brand-400" /> Language Distribution
      </h3>
      <TiltCard className="p-6 h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie data={data} cx="50%" cy="50%" innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value" stroke="none" isAnimationActive={false}>
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
          </PieChart>
        </ResponsiveContainer>
        
        <div className="flex flex-wrap justify-center gap-3 mt-4">
          {data.map((entry, index) => (
            // text-muted replaces text-slate-300
            <div key={entry.name} className="flex items-center gap-1.5 text-xs text-muted">
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: COLORS[index % COLORS.length] }}></span>
              {entry.name}
            </div>
          ))}
        </div>
      </TiltCard>
    </div>
  );
};

export default LanguageChart;
