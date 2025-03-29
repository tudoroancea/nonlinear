import React, { useMemo } from "react";
import {
  ApolloClient,
  ApolloProvider,
  from,
  HttpLink,
  InMemoryCache,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { useAtomValue } from "jotai";
import { githubTokenAtom } from "@/lib/atoms/github";

interface ApolloClientProviderProps {
  children: React.ReactNode;
}

export function ApolloClientProvider({ children }: ApolloClientProviderProps) {
  const { token, loading, error } = useAtomValue(githubTokenAtom);

  const client = useMemo(() => {
    const httpLink = new HttpLink({ uri: "https://api.github.com/graphql" });

    const authLink = setContext((_, { headers }) => {
      return {
        headers: {
          ...headers,
          Authorization: token ? `Bearer ${token}` : "",
        },
      };
    });

    return new ApolloClient({
      link: from([authLink, httpLink]),
      cache: new InMemoryCache(),
    });
  }, [token]); // Only recreate client when token changes

  // TODO: create actual loading state
  if (loading) {
    return <div>Setting up GitHub connection...</div>;
  }

  // TODO: create actual error state
  if (error) {
    return <div>Error connecting to GitHub: {error.message}</div>;
  }

  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}
