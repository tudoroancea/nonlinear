import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";

// Types
export interface GitHubUser {
  login: string;
  name: string | null;
}

export interface GitHubProject {
  id: string;
  title: string;
}

// User info atom
export const userInfoAtom = atom<{
  loading: boolean;
  error: Error | null;
  data: GitHubUser | null;
}>({
  loading: true,
  error: null,
  data: null,
});

// Projects atom
export const projectsAtom = atom<{
  loading: boolean;
  error: Error | null;
  data: GitHubProject[];
}>({
  loading: true,
  error: null,
  data: [],
});

// Pinned projects atom (persisted in localStorage)
export const pinnedProjectsAtom = atomWithStorage<string[]>(
  "pinnedProjects",
  [],
);
