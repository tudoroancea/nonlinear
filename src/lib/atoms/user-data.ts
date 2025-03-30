import { gql } from "@apollo/client";
import { atomWithStorage } from "jotai/utils";
import { graphqlClientAtom } from "@/lib/atoms/graphql-client";
import { atom } from "jotai";

// Our combined query to fetch viewer details and projects
export const GET_USER_AND_PROJECTS = gql`
  query {
    viewer {
      login
      name
      projectsV2(first: 20) {
        nodes {
          id
          title
        }
      }
    }
  }
`;

// TODO: create actual type here
// Create the query atom using jotai-apollo.
// This returns an array: [dataAtom, statusAtom].
// The dataAtom will eventually resolve to the query result.
// export const [userAndProjectsAtom, userAndProjectsStatusAtom] = atomsWithQuery(
//   () => ({
//     query: GET_USER_AND_PROJECTS,
//   }),
//   // (get) => get(graphqlClientAtom),
// );

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
    .then((client) => client.query({ query: GET_USER_AND_PROJECTS }))
    .then((queryResult) => {
      const { data } = queryResult;
      return {
        username: data?.viewer?.login,
        displayName: data?.viewer?.name,
        projects: data?.viewer?.projectsV2?.nodes || [],
      };
    }),
);

// Pinned projects atom (persisted in localStorage)
const PINNED_PROJECTS_KEY = "pinnedProjects";
export const pinnedProjectsAtom = atomWithStorage<string[]>(
  PINNED_PROJECTS_KEY,
  [],
);
