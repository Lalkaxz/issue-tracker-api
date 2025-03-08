export function getRepositoryName(repoUrl: string): string {
  const parsedUrl = new URL(repoUrl);
  const pathParts = parsedUrl.pathname.split('/');

  return pathParts[2];
}

export function isGitHubRepoUrl(repoUrl: string): boolean {
  try {
    const url = new URL(repoUrl);
    if (url.hostname !== 'github.com') return false;

    const parts = url.pathname.split('/').filter(Boolean);
    return parts.length === 2;
  } catch {
    return false;
  }
}
