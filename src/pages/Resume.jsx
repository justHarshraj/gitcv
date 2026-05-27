import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import html2pdf from 'html2pdf.js';
import { DndContext, closestCenter } from '@dnd-kit/core';
import { arrayMove, SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { Download, Home as HomeIcon, AlertCircle, Loader2 } from 'lucide-react';

import ProfileCard from '../components/ProfileCard';
import SkillsSection from '../components/SkillsSection';
import RepoGrid from '../components/RepoGrid';
import LanguageChart from '../components/LanguageChart';
import HeatmapSection from '../components/HeatmapSection';
import ThemeToggle from '../components/ThemeToggle';
import SortableItem from '../components/SortableItem';

import { fetchUserData } from '../services/githubApi';
import { generateSummary } from '../utils/generateSummary';
import { calculateSkills } from '../utils/calculateSkills';

const Resume = () => {
  const { username } = useParams();
  const navigate = useNavigate();
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [resumeData, setResumeData] = useState(null);
  const [currentTheme, setCurrentTheme] = useState('default');
  
  // Manage the order of the sections
  const [sections, setSections] = useState(['profile', 'heatmap', 'skills', 'grid']);

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

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (active.id !== over.id) {
      setSections((items) => {
        const oldIndex = items.indexOf(active.id);
        const newIndex = items.indexOf(over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  const exportPDF = async () => {
    // 1. Force Print Theme for clean PDF
    document.documentElement.setAttribute('data-theme', 'print');
    
    // 2. Wait for DOM to paint the new colors
    await new Promise(resolve => setTimeout(resolve, 300));

    const element = document.getElementById('resume-export-target');
    const opt = {
      margin: 0.5,
      filename: `${username}-GitCV.pdf`,
      image: { type: 'jpeg', quality: 1 },
      html2canvas: { scale: 2, useCORS: true, backgroundColor: '#ffffff' },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
    };

    html2pdf().set(opt).from(element).save().then(() => {
      // 3. Restore the user's selected theme
      document.documentElement.setAttribute('data-theme', currentTheme);
    });
  };

  // Component Map for rendering based on sort order
  const renderSection = (id) => {
    switch(id) {
      case 'profile': return <ProfileCard profile={resumeData.profile} summary={resumeData.summary} />;
      case 'heatmap': return <HeatmapSection username={username} />;
      case 'skills': return <SkillsSection skills={resumeData.skills} />;
      case 'grid': return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2"><RepoGrid repos={resumeData.topRepos} /></div>
          <div className="lg:col-span-1"><LanguageChart stats={resumeData.stats} /></div>
        </div>
      );
      default: return null;
    }
  };

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <Loader2 className="w-12 h-12 text-brand-500 animate-spin" />
    </div>
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
      <div className="max-w-5xl mx-auto space-y-8">
        
        {/* Top Navigation & Controls */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 bg-surface p-4 rounded-2xl border border-border shadow-float backdrop-blur-md">
          <button onClick={() => navigate('/')} className="flex items-center gap-2 text-muted hover:text-brand-400 transition-colors">
            <HomeIcon className="w-5 h-5" /> New Search
          </button>
          
          <div className="flex items-center gap-4">
            <ThemeToggle currentTheme={currentTheme} setTheme={setCurrentTheme} />
            <button 
              onClick={exportPDF}
              className="flex items-center gap-2 bg-brand-500 hover:bg-brand-600 text-white px-5 py-2 rounded-xl font-medium shadow-float transition-all active:scale-95"
            >
              <Download className="w-4 h-4" /> Export PDF
            </button>
          </div>
        </div>

        {/* Draggable Resume Container */}
        <div id="resume-export-target" className="p-4 -m-4">
          <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
            <SortableContext items={sections} strategy={verticalListSortingStrategy}>
              <div className="space-y-6">
                {sections.map((id) => (
                  <SortableItem key={id} id={id}>
                    {renderSection(id)}
                  </SortableItem>
                ))}
              </div>
            </SortableContext>
          </DndContext>
        </div>
        
      </div>
    </div>
  );
};

export default Resume;
