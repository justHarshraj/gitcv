import React from 'react';
import { Star, GitFork, ExternalLink, FolderGit2 } from 'lucide-react';
import TiltCard from '../animations/TiltCard';

const RepoGrid = ({ repos }) => {
  if (!repos || repos.length === 0) return null;

  return (
    <div className="space-y-4">
      {/* text-main replaces text-white */}
      <h3 className="text-xl font-semibold text-main flex items-center gap-2 px-2">
        <FolderGit2 className="text-brand-400" /> Top Projects
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {repos.map(repo => (
          <TiltCard key={repo.id} className="p-6 flex flex-col h-full">
            <div className="flex justify-between items-start mb-4">
              {/* text-main replaces text-white */}
              <h4 className="text-lg font-bold text-main truncate pr-4">
                <a href={repo.html_url} target="_blank" rel="noreferrer" className="hover:text-brand-400 transition-colors flex items-center gap-2">
                  {repo.name} <ExternalLink className="w-4 h-4 opacity-50" />
                </a>
              </h4>
            </div>
            
            {/* text-muted replaces text-slate-400 */}
            <p className="text-muted text-sm mb-6 flex-grow line-clamp-3">
              {repo.description || 'No description provided.'}
            </p>

            {/* border-border and text-muted applied below */}
            <div className="flex items-center justify-between text-sm pt-4 border-t border-border mt-auto">
              <span className="flex items-center gap-1.5 text-muted">
                <span className="w-2.5 h-2.5 rounded-full bg-brand-400"></span>
                {repo.language || 'Mixed'}
              </span>
              <div className="flex gap-4 text-muted">
                <span className="flex items-center gap-1 hover:text-yellow-400 transition-colors">
                  <Star className="w-4 h-4" /> {repo.stargazers_count}
                </span>
                <span className="flex items-center gap-1 hover:text-brand-400 transition-colors">
                  <GitFork className="w-4 h-4" /> {repo.forks_count}
                </span>
              </div>
            </div>
          </TiltCard>
        ))}
      </div>
    </div>
  );
};

export default RepoGrid;
