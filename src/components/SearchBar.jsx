import React, { useState } from 'react';
import { Search, Loader2 } from 'lucide-react';
import { validateUsername } from '../utils/validators';

const SearchBar = ({ onSearch, isLoading }) => {
  const [username, setUsername] = useState('');
  const [localError, setLocalError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const error = validateUsername(username);
    if (error) {
      setLocalError(error);
      return;
    }
    setLocalError('');
    onSearch(username.trim());
  };

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center">
      <form onSubmit={handleSubmit} className="relative w-full group">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          {isLoading ? (
            <Loader2 className="h-5 w-5 text-brand-400 animate-spin" />
          ) : (
            <Search className="h-5 w-5 text-slate-400 group-focus-within:text-brand-400 transition-colors" />
          )}
        </div>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter GitHub username (e.g., torvalds)"
          disabled={isLoading}
          className="w-full pl-12 pr-4 py-4 bg-surface backdrop-blur-md border border-slate-700/50 rounded-2xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent shadow-float transition-all disabled:opacity-50"
        />
        <button
          type="submit"
          disabled={isLoading}
          className="absolute inset-y-2 right-2 px-6 bg-brand-600 hover:bg-brand-500 text-white rounded-xl font-medium transition-colors disabled:opacity-50"
        >
          Generate
        </button>
      </form>
      {localError && (
        <p className="mt-3 text-red-400 text-sm font-medium bg-red-900/20 px-4 py-1 rounded-full border border-red-900/50">
          {localError}
        </p>
      )}
    </div>
  );
};

export default SearchBar;
