import axios from 'axios';

const token = import.meta.env.VITE_GITHUB_TOKEN;

const api = axios.create({
  baseURL: 'https://api.github.com',
  ...(token && {
    headers: { Authorization: `token ${token}` },
  }),
});

const handleApiError = (error) => {
  if (error.response) {
    if (error.response.status === 404) throw new Error("Developer not found.");
    if (error.response.status === 403) throw new Error("GitHub API rate limit reached. Please try again later.");
  }
  if (error.code === 'ECONNABORTED') throw new Error("Request timed out. Please check your connection.");
  throw new Error("An unexpected error occurred.");
};

export const fetchUserData = async (username) => {
  try {
    const [profileRes, reposRes] = await Promise.all([
      api.get(`/users/${username}`, { timeout: 5000 }),
      api.get(`/users/${username}/repos?per_page=100&sort=pushed`, { timeout: 8000 })
    ]);

    const profile = profileRes.data;
    const repos = reposRes.data;

    if (repos.length === 0) {
       throw new Error("No public repositories found.");
    }

    const sortedRepos = [...repos].sort((a, b) => b.stargazers_count - a.stargazers_count);
    
    // Only fetch languages for top 5 to prevent rate limiting
    const topRepos = sortedRepos.slice(0, 5);
    const languagePromises = topRepos.map(repo => api.get(repo.languages_url));
    const languageResponses = await Promise.all(languagePromises);
    
    const languageStats = {};
    languageResponses.forEach(res => {
      Object.entries(res.data).forEach(([lang, bytes]) => {
        languageStats[lang] = (languageStats[lang] || 0) + bytes;
      });
    });

    return { profile, repos: sortedRepos, languageStats };
  } catch (error) {
    handleApiError(error);
  }
};
