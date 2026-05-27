export const calculateSkills = (repos, languageStats) => {
  const skillMap = new Map();

  repos.forEach(repo => {
    if (repo.language) {
      const current = skillMap.get(repo.language) || { count: 0, bytes: 0 };
      skillMap.set(repo.language, { count: current.count + 1, bytes: current.bytes });
    }
  });

  Object.entries(languageStats).forEach(([lang, bytes]) => {
    const current = skillMap.get(lang) || { count: 1, bytes: 0 };
    skillMap.set(lang, { ...current, bytes: current.bytes + bytes });
  });

  const formattedSkills = Array.from(skillMap.entries()).map(([name, data]) => {
    // Proficiency algorithm combining repo frequency and byte volume
    const score = data.bytes + (data.count * 50000);
    
    let level = "Familiar";
    if (score > 300000 || data.count >= 5) level = "Advanced";
    else if (score > 100000 || data.count >= 2) level = "Intermediate";

    return { name, level, score };
  });

  return formattedSkills.sort((a, b) => b.score - a.score).slice(0, 10);
};
