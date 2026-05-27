import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import html2pdf from 'html2pdf.js';
import { Download, Home as HomeIcon, AlertCircle, Loader2 } from 'lucide-react';

// New Imports
import TemplateSelector from '../components/TemplateSelector';
import ThemeToggle from '../components/ThemeToggle';
import ATSProfessional from '../templates/ATSProfessional';
import ModernTech from '../templates/ModernTech';
import DevPortfolio from '../templates/DevPortfolio';

import { fetchUserData } from '../services/githubApi';
import { generateSummary } from '../utils/generateSummary';
import { calculateSkills } from '../utils/calculateSkills';

const Resume = () => {
  const { username } = useParams();
  const navigate = useNavigate();
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [resumeData, setResumeData] = useState(null);
  
  const [currentTheme, setCurrentTheme] = useState('dark');
  const [currentTemplate, setCurrentTemplate] = useState('modern'); // 'modern', 'ats', or 'portfolio'

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchUserData(username);
        const topLanguages = Object.keys(data.languageStats).sort((a, b) => data.languageStats[b] - data.languageStats[a]);
        
        setResumeData({
          profile: data.profile,
          topRepos: data.repos.slice(0, 4),
          stats: data.languageStats,
          summary: generateSummary(data.profile, data.repos, topLanguages),
          skills: calculateSkills(data.repos, data.languageStats)
        });
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, [username]);

  const exportPDF = async () => {
    // If using the ATS or Modern templates, they have their own hardcoded colors.
    // If using the Portfolio template, we force it to light mode to save printer ink, 
    // UNLESS you specifically want a dark PDF, then comment this out.
    if (currentTemplate === 'portfolio') {
      document.documentElement.setAttribute('data-theme', 'light');
    }
    
    await new Promise(resolve => setTimeout(resolve, 300));

    const element = document.getElementById('resume-export-target');
    const opt = {
      margin: currentTemplate === 'portfolio' ? 0.5 : 0, // No margins for full-page templates
      filename: `${username}-Resume.pdf`,
      image: { type: 'jpeg', quality: 1 },
      html2canvas: { scale: 2, useCORS: true },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
    };

    html2pdf().set(opt).from(element).save().then(() => {
      // Restore Theme
      if (currentTheme === 'dark') document.documentElement.removeAttribute('data-theme');
      else document.documentElement.setAttribute('data-theme', currentTheme);
    });
  };

  // Render the selected template
  const renderTemplate = () => {
    switch(currentTemplate) {
      case 'ats': return <ATSProfessional data={resumeData} />;
      case 'modern': return <ModernTech data={resumeData} />;
      case 'portfolio': return <DevPortfolio data={resumeData} username={username} />;
      default: return <ModernTech data={resumeData} />;
    }
  };

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-background"><Loader2 className="w-12 h-12 text-brand-500 animate-spin" /></div>
  );

  if (error) return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background text-main p-6 space-y-4">
      <AlertCircle className="w-12 h-12 text-red-500" />
      <h2 className="text-2xl font-bold">{error}</h2>
      <button onClick={() => navigate('/')} className="text-brand-400 hover:underline">Go Back</button>
    </div>
  );

  return (
    <div className="min-h-screen bg-background py-8 px-4 sm:px-12 transition-colors duration-300">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Navigation & Controls */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 bg-surface p-4 rounded-2xl border border-border shadow-float backdrop-blur-md">
          <button onClick={() => navigate('/')} className="flex items-center gap-2 text-muted hover:text-brand-400 transition-colors">
            <HomeIcon className="w-5 h-5" /> New Search
          </button>
          
          <div className="flex flex-wrap items-center justify-center gap-4">
            <TemplateSelector currentTemplate={currentTemplate} setTemplate={setCurrentTemplate} />
            <ThemeToggle currentTheme={currentTheme} setTheme={setCurrentTheme} />
            <button onClick={exportPDF} className="flex items-center gap-2 bg-brand-500 hover:bg-brand-600 text-white px-5 py-2 rounded-xl font-medium shadow-float transition-all active:scale-95">
              <Download className="w-4 h-4" /> Export PDF
            </button>
          </div>
        </div>

        {/* Dynamic Template Target */}
        <div className="flex justify-center w-full overflow-x-auto pb-8 custom-scrollbar">
          {/* We wrap the target to ensure the PDF captures only the template width */}
          <div id="resume-export-target" className="min-w-[800px]">
            {renderTemplate()}
          </div>
        </div>
        
      </div>
    </div>
  );
};

export default Resume;
