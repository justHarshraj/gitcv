import React from 'react';
import { useNavigate } from 'react-router-dom';
import SearchBar from '../components/SearchBar';
import FloatingElement from '../animations/FloatingElement';

const Home = () => {
  const navigate = useNavigate();

  const handleSearch = (username) => {
    navigate(`/u/${username}`); // Redirects to the dynamic URL
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 relative">
      <div className="fixed top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-brand-500/20 blur-[120px] pointer-events-none" />
      
      <div className="max-w-2xl w-full space-y-8 relative z-10 text-center">
        <FloatingElement yOffset={10} duration={5}>
          <h1 className="text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-brand-400 to-white tracking-tight pb-2">
            GitCV
          </h1>
        </FloatingElement>
        <p className="text-muted text-lg">
          Transform any GitHub profile into a live, interactive developer portfolio.
        </p>
        
        <SearchBar onSearch={handleSearch} isLoading={false} />
      </div>
    </div>
  );
};

export default Home;
