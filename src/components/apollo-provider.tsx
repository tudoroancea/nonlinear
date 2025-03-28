import React, { useMemo } from "react";
import {
  ApolloClient,
  ApolloProvider,
  from,
  HttpLink,
  InMemoryCache,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { useAuth0 } from "@auth0/auth0-react";

interface ApolloClientProviderProps {
  children: React.ReactNode;
}

export function ApolloClientProvider({ children }: ApolloClientProviderProps) {
  const {
    user,
    isLoading: isAuthLoading,
    isAuthenticated,
    getAccessTokenSilently,
  } = useAuth0();

  const client = useMemo(() => {
    const httpLink = new HttpLink({ uri: "https://api.github.com/graphql" });

    const authLink = setContext(async (_, { headers }) => {
      let githubToken: string | null = null;

      if (user && isAuthenticated) {
        try {
          const accessToken = await getAccessTokenSilently();
          const response = await fetch(
            `/api/get-github-token?userId=${user.sub}`,
            {
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
            },
          );

          if (response.ok) {
            const data = await response.json();
            githubToken = data.githubToken;
          } else {
            console.error(
              "Failed to fetch GitHub token from Vercel function:",
              response.statusText,
            );
          }
        } catch (error) {
          console.error(
            "Error fetching GitHub token from Vercel function:",
            error,
          );
        }
      }

      return {
        headers: {
          ...headers,
          Authorization: githubToken ? `Bearer ${githubToken}` : "",
        },
      };
    });

    return new ApolloClient({
      link: from([authLink, httpLink]),
      cache: new InMemoryCache(),
    });
  }, [user, isAuthenticated, getAccessTokenSilently]);

  if (isAuthLoading) {
    return <div>Loading Authentication for Apollo...</div>;
  }

  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}
