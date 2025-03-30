import { atom } from "jotai";

export const clerkUserIdAtom = atom<string | null>(null);

export const asyncReadGithubTokenAtom = atom<Promise<string>>(async (get) =>
  fetch(`/api/get-github-token?userId=${get(clerkUserIdAtom)}`)
    .then((response) => response.json())
    .then((data) => {
      const token = data.githubToken as string;
      return token;
    }),
);
