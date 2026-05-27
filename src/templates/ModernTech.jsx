import React from 'react';
import { Code2, MapPin, Users, Star, GitFork } from 'lucide-react';

const ModernTech = ({ data }) => {
  const { profile, summary, skills, topRepos } = data;

  return (
    <div className="bg-slate-50 text-slate-800 font-sans max-w-[800px] mx-auto shadow-xl print:shadow-none min-h-[1056px] flex">
      
      {/* Left Column (35%) */}
      <div className="w-[35%] bg-slate-900 text-white p-8 flex flex-col gap-8">
        <div className="text-center">
          <img src={profile.avatar_url} alt="Profile" className="w-32 h-32 rounded-full border-4 border-slate-700 mx-auto mb-4" />
          <h1 className="text-2xl font-bold leading-tight">{profile.name || profile.login}</h1>
          <p className="text-blue-400 text-sm mt-1">@{profile.login}</p>
        </div>

        <div>
          <h2 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3 border-b border-slate-700 pb-1">Contact & Links</h2>
          <div className="space-y-3 text-sm text-slate-300">
            <span className="flex items-center gap-2"><Code2 className="w-4 h-4 text-slate-400" /> / {profile.login}</span>
            {profile.location && <span className="flex items-center gap-2"><MapPin className="w-4 h-4 text-slate-400" /> {profile.location}</span>}
            <span className="flex items-center gap-2"><Users className="w-4 h-4 text-slate-400" /> {profile.followers} Followers</span>
          </div>
        </div>

        <div>
          <h2 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3 border-b border-slate-700 pb-1">Tech Stack</h2>
          <div className="flex flex-wrap gap-2">
            {skills.map(skill => (
              <span key={skill.name} className="bg-slate-800 text-blue-300 px-2.5 py-1 rounded text-xs font-medium border border-slate-700">
                {skill.name}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Right Column (65%) */}
      <div className="w-[65%] p-8 bg-white">
        <div className="mb-8">
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">Developer Profile</h2>
          <p className="text-slate-600 mt-3 leading-relaxed">{summary}</p>
          <p className="text-slate-600 mt-2 leading-relaxed">{profile.bio}</p>
        </div>

        <div>
          <h2 className="text-xl font-bold text-slate-900 border-b-2 border-slate-100 pb-2 mb-4">Featured Repositories</h2>
          <div className="space-y-6">
            {topRepos.map(repo => (
              <div key={repo.id} className="group">
                <div className="flex justify-between items-start mb-1">
                  <h3 className="font-bold text-lg text-blue-600 group-hover:text-blue-700">
                    <a href={repo.html_url} target="_blank" rel="noreferrer">{repo.name}</a>
                  </h3>
                  <div className="flex gap-3 text-sm font-medium text-slate-500">
                    <span className="flex items-center gap-1"><Star className="w-3 h-3" /> {repo.stargazers_count}</span>
                    <span className="flex items-center gap-1"><GitFork className="w-3 h-3" /> {repo.forks_count}</span>
                  </div>
                </div>
                <p className="text-slate-600 text-sm mb-2 line-clamp-2">{repo.description}</p>
                {repo.topics && repo.topics.length > 0 && (
                  <div className="flex gap-2 mt-2 flex-wrap">
                    {repo.topics.slice(0, 3).map(topic => (
                      <span key={topic} className="text-[10px] uppercase font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                        {topic}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModernTech;
