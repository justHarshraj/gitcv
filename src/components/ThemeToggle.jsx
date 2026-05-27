import React from 'react';
import { Palette } from 'lucide-react';

const ThemeToggle = ({ currentTheme, setTheme }) => {
  const handleThemeChange = (e) => {
    const newTheme = e.target.value;
    setTheme(newTheme);
    
    if (newTheme === 'dark') {
      document.documentElement.removeAttribute('data-theme');
    } else {
      document.documentElement.setAttribute('data-theme', newTheme);
    }
  };

  return (
    <div className="flex items-center gap-2 bg-surface border border-border px-3 py-1.5 rounded-xl shadow-float backdrop-blur-md">
      <Palette className="w-4 h-4 text-brand-400" />
      <select 
        value={currentTheme}
        onChange={handleThemeChange}
        className="bg-transparent text-main text-sm font-medium focus:outline-none cursor-pointer"
      >
        <option value="dark">Dark Theme</option>
        <option value="light">Light Theme</option>
        <option value="terminal">Terminal</option>
      </select>
    </div>
  );
};

export default ThemeToggle;
