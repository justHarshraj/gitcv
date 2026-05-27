import React from 'react';
import ProfileCard from '../components/ProfileCard';
import SkillsSection from '../components/SkillsSection';
import HeatmapSection from '../components/HeatmapSection';
import RepoGrid from '../components/RepoGrid';
import LanguageChart from '../components/LanguageChart';

const DevPortfolio = ({ data, username }) => {
  return (
    <div className="space-y-6 max-w-[900px] mx-auto print:bg-[#0f172a] print:text-white p-8">
      {/* Note: We inject specific classes for 'print' to ensure 
        this specific template retains its dark styling in the PDF 
      */}
      <ProfileCard profile={data.profile} summary={data.summary} />
      <SkillsSection skills={data.skills} />
      <HeatmapSection username={username} />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2"><RepoGrid repos={data.topRepos} /></div>
        <div className="lg:col-span-1"><LanguageChart stats={data.stats} /></div>
      </div>
    </div>
  );
};

export default DevPortfolio;
