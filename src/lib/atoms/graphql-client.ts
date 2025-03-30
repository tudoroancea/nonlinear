import { ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client";
import { atom } from "jotai";
import { asyncReadGithubTokenAtom } from "./github-token";
import { setContext } from "@apollo/client/link/context";

// Initialize the Apollo client once the github token as been fetched
export const graphqlClientAtom = atom(async (get) =>
  get(asyncReadGithubTokenAtom).then(
    (token) =>
      new ApolloClient({
        cache: new InMemoryCache(),
        link: setContext((_, { headers }) => {
          return {
            headers: {
              ...headers,
              Authorization: `Bearer ${token}`,
            },
          };
        }).concat(createHttpLink({ uri: "https://api.github.com/graphql" })),
      }),
  ),
);
