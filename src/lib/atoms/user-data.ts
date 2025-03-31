import { graphqlClientAtom } from "@/lib/atoms/graphql-client";
import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";
import {
  UserDataQuery,
  UserDataDocument,
  ProjectDetailsQuery,
  ProjectDetailsDocument,
} from "@/generated/graphql";

interface Project {
  id: string;
  title: string;
}

interface UserData {
  username: string | null;
  displayName: string | null;
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
        username: data?.viewer?.login ?? null,
        displayName: data?.viewer?.name ?? null,
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

export const brains2ProjectDataAtom = atom(async (get) =>
  get(graphqlClientAtom)
    .then((client) =>
      client.query({
        query: ProjectDetailsDocument,
        variables: { projectId: "PVT_kwHOA68A884AoHQa" },
      }),
    )
    .then(({ data }: { data: ProjectDetailsQuery }) => {
      console.log(data);
    }),
);
