import { asyncReadGithubTokenAtom } from "@/lib/atoms/auth";
import { ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { atom } from "jotai";

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
