import React from 'react';
import { Code2, MapPin, Mail, Globe } from 'lucide-react';

const ATSProfessional = ({ data }) => {
  const { profile, summary, skills, topRepos } = data;

  return (
    <div className="bg-white text-gray-900 font-sans p-10 max-w-[800px] mx-auto shadow-xl print:shadow-none min-h-[1056px]">
      
      {/* Header */}
      <div className="border-b-2 border-gray-900 pb-4 mb-6">
        <h1 className="text-4xl font-bold uppercase tracking-tight">{profile.name || profile.login}</h1>
        <p className="text-lg text-gray-600 mt-1">{summary}</p>
        
        <div className="flex flex-wrap gap-4 mt-3 text-sm text-gray-600">
          <span className="flex items-center gap-1"><Code2 className="w-4 h-4" /> github.com/{profile.login}</span>
          {profile.location && <span className="flex items-center gap-1"><MapPin className="w-4 h-4" /> {profile.location}</span>}
          {profile.blog && <span className="flex items-center gap-1"><Globe className="w-4 h-4" /> {profile.blog}</span>}
        </div>
      </div>

      {/* Skills (ATS Friendly Comma Separated) */}
      <div className="mb-6">
        <h2 className="text-xl font-bold uppercase tracking-wider text-gray-900 mb-2">Technical Skills</h2>
        <div className="text-gray-800 leading-relaxed">
          <span className="font-semibold text-gray-900">Core Competencies: </span>
          {skills.map(s => s.name).join(', ')}
        </div>
      </div>

      {/* Projects */}
      <div className="mb-6">
        <h2 className="text-xl font-bold uppercase tracking-wider text-gray-900 border-b border-gray-300 pb-1 mb-4">Highlighted Projects</h2>
        <div className="space-y-5">
          {topRepos.map(repo => (
            <div key={repo.id}>
              <div className="flex justify-between items-baseline">
                <h3 className="font-bold text-gray-900 text-lg">
                  <a href={repo.html_url} target="_blank" rel="noreferrer" className="hover:underline">{repo.name}</a>
                </h3>
                <span className="text-sm font-medium text-gray-600 border border-gray-300 px-2 rounded">
                  {repo.language || 'Mixed Stack'}
                </span>
              </div>
              <ul className="list-disc list-inside mt-2 text-gray-700 text-sm space-y-1">
                <li>{repo.description || 'Developed and maintained core features for this repository.'}</li>
                <li>Earned {repo.stargazers_count} stars and {repo.forks_count} forks from the open-source community.</li>
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ATSProfessional;
