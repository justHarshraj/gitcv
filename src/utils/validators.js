export const validateUsername = (username) => {
  if (!username) return "Please enter a GitHub username.";
  if (username.trim().length === 0) return "Username cannot be empty spaces.";
  const githubRegex = /^[a-z\d](?:[a-z\d]|-(?=[a-z\d])){0,38}$/i;
  if (!githubRegex.test(username.trim())) return "Invalid GitHub username format.";
  return null;
};
