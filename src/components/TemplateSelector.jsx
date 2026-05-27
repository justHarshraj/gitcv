import React from 'react';
import { LayoutTemplate } from 'lucide-react';

const TemplateSelector = ({ currentTemplate, setTemplate }) => {
  return (
    <div className="flex items-center gap-2 bg-surface border border-border px-3 py-1.5 rounded-xl shadow-float backdrop-blur-md">
      <LayoutTemplate className="w-4 h-4 text-brand-400" />
      <select 
        value={currentTemplate}
        onChange={(e) => setTemplate(e.target.value)}
        className="bg-transparent text-main text-sm font-medium focus:outline-none cursor-pointer"
      >
        <option value="modern">Modern Tech (Startup)</option>
        <option value="ats">ATS Professional (Standard)</option>
        <option value="portfolio">Visual Dashboard</option>
      </select>
    </div>
  );
};

export default TemplateSelector;
