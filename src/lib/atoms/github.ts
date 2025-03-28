import { atom } from "jotai";

export interface GitHubTokenState {
  token: string | null;
  loading: boolean;
  error: Error | null;
}

export const githubTokenAtom = atom<GitHubTokenState>({
  token: null,
  loading: false,
  error: null,
});

// Write-only atom for fetching the token
export const fetchGitHubTokenAtom = atom(
  null,
  async (get, set, userId: string) => {
    // Don't fetch if we're already loading
    if (get(githubTokenAtom).loading) return;

    set(githubTokenAtom, { token: null, loading: true, error: null });

    try {
      const response = await fetch(`/api/get-github-token?userId=${userId}`);

      if (!response.ok) {
        throw new Error(`Failed to fetch GitHub token: ${response.statusText}`);
      }

      const data = await response.json();
      set(githubTokenAtom, {
        token: data.githubToken,
        loading: false,
        error: null,
      });
    } catch (error) {
      console.error("Error fetching GitHub token:", error);
      set(githubTokenAtom, {
        token: null,
        loading: false,
        error: error instanceof Error ? error : new Error(String(error)),
      });
    }
  },
);
