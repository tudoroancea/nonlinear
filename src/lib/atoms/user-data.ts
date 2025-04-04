import { graphqlClientAtom } from "@/lib/atoms/graphql-client";
import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";
import { UserDataQuery, UserDataDocument } from "@/generated/graphql";

interface Project {
  id: string;
  title: string;
}

interface UserData {
  username: string;
  displayName: string;
  projects: Project[];
}

export const userDataAtom = atom<Promise<UserData>>(async (get) =>
  get(graphqlClientAtom)
    .then((client) =>
      // Use the generated document
      client.query({
        query: UserDataDocument,
      }),
    )
    .then((queryResult) => {
      // The data is now fully typed with the generated types
      const { data } = queryResult as { data: UserDataQuery };

      return {
        username: data?.viewer?.login ?? "",
        displayName: data?.viewer?.name ?? "",
        projects:
          data?.viewer?.projectsV2?.nodes?.map((node) => ({
            id: node?.id ?? "",
            title: node?.title ?? "",
          })) ?? [],
      };
    }),
);

// Pinned projects atom (persisted in localStorage)
const PINNED_PROJECTS_KEY = "pinnedProjects";
export const pinnedProjectsAtom = atomWithStorage<string[]>(
  PINNED_PROJECTS_KEY,
  [],
);
