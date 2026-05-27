import React from 'react';
import { MapPin, Users, Calendar, User } from 'lucide-react';
import TiltCard from '../animations/TiltCard';

const ProfileCard = ({ profile, summary }) => {
  const joinDate = new Date(profile.created_at).toLocaleDateString('en-US', { month: 'short', year: 'numeric' });

  return (
    <TiltCard className="p-8">
      <div className="flex flex-col md:flex-row gap-6 items-center md:items-start text-center md:text-left">
        <img 
          src={profile.avatar_url} 
          alt={profile.login} 
          className="w-32 h-32 rounded-full border-4 border-brand-500/30 shadow-glow"
        />
        <div className="flex-1 space-y-4">
          <div>
            <h1 className="text-3xl font-bold text-white tracking-tight">{profile.name || profile.login}</h1>
            <a href={profile.html_url} target="_blank" rel="noreferrer" className="flex items-center justify-center md:justify-start gap-2 text-brand-400 hover:text-brand-300 transition-colors mt-1">
              <User className="w-4 h-4" /> @{profile.login}
            </a>
          </div>
          
          <p className="text-slate-300 leading-relaxed text-sm md:text-base">
            {profile.bio || summary}
          </p>

          <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 text-sm text-slate-400 pt-2 border-t border-slate-700/50">
            {profile.location && (
              <span className="flex items-center gap-1"><MapPin className="w-4 h-4" /> {profile.location}</span>
            )}
            <span className="flex items-center gap-1"><Users className="w-4 h-4" /> {profile.followers} followers</span>
            <span className="flex items-center gap-1"><Calendar className="w-4 h-4" /> Joined {joinDate}</span>
          </div>
        </div>
      </div>
    </TiltCard>
  );
};

export default ProfileCard;
