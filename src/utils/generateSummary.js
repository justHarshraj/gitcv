export const generateSummary = (profile, repos, topLanguages) => {
  const totalStars = repos.reduce((acc, repo) => acc + repo.stargazers_count, 0);
  const primaryLanguage = topLanguages[0] || 'various technologies';
  
  let summary = `Dynamic developer primarily working with ${primaryLanguage}, showcasing ${profile.public_repos} public repositories. `;
  
  if (totalStars > 20) {
    summary += `Recognized by the community with ${totalStars} stars. `;
  }
  if (repos.some(r => r.fork)) {
    summary += `Actively engages in open-source collaboration.`;
  } else {
    summary += `Demonstrates a strong focus on independent architecture and development.`;
  }

  return summary;
};
