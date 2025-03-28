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

// Re-using the interface from previous example - adjust if needed
interface Auth0Identity {
  provider: string;
  user_id: string;
  connection: string;
  isSocial: boolean;
  access_token?: string; // The token we want!
}

interface ApolloClientProviderProps {
  children: React.ReactNode;
}

export function ApolloClientProvider({ children }: ApolloClientProviderProps) {
  // Get user and loading state from Auth0
  const { user, isLoading: isAuthLoading, isAuthenticated } = useAuth0();
  console.log(user);

  // Memoize the Apollo Client instance.
  // Recreate it only if the user object reference changes (e.g., on login/logout)
  // or if Auth0 is no longer loading.
  const client = useMemo(() => {
    const httpLink = new HttpLink({ uri: "https://api.github.com/graphql" });

    // authLink is now defined inside useMemo, accessing 'user' from the outer scope
    const authLink = setContext((_, { headers }) => {
      // --- Logic to find GitHub token within the Auth0 user object ---
      let githubToken: string | null = null;

      if (user && isAuthenticated) {
        // Log the user object structure the first time to confirm token location
        // console.log("Auth0 User object in Apollo setContext:", user);

        // Attempt 1: Check standard 'identities' array (most common)
        if (Array.isArray(user.identities)) {
          const githubIdentity = user.identities.find(
            (id: Auth0Identity) => id.provider === "github", // Ensure 'github' matches provider name in Auth0
          );
          if (githubIdentity?.access_token) {
            githubToken = githubIdentity.access_token;
            // console.log("Apollo found GitHub token in user.identities");
          }
        }

        // Add other checks here if needed (e.g., namespaced claims)
        // based on your console.log(user) output and Auth0 rules/config.
        // Example:
        // const namespacedIdentities = user['https://your-namespace/identities'];
        // if (!githubToken && Array.isArray(namespacedIdentities)) { ... }

        if (!githubToken) {
          console.warn(
            "Apollo could not find GitHub access_token in Auth0 user object.",
            "Check Auth0 connection scopes/settings and inspect the logged user object.",
          );
        }
      } else {
        // This case should ideally not happen if components triggering queries
        // are correctly protected by Auth0's isAuthenticated flag elsewhere.
        // console.log("Apollo setContext: User is not authenticated or user object unavailable.");
      }
      // --- End token finding logic ---

      // Return the headers object for the request
      return {
        headers: {
          ...headers,
          // Conditionally add the Authorization header
          Authorization: githubToken ? `Bearer ${githubToken}` : "",
        },
      };
    });

    // Create the Apollo Client instance
    return new ApolloClient({
      link: from([authLink, httpLink]), // Chain authLink before httpLink
      cache: new InMemoryCache(),
    });
  }, [user, isAuthenticated]); // Recalculate client if user or auth status changes

  // Render loading state or null while Auth0 is initializing
  if (isAuthLoading) {
    // Or return a dedicated loading spinner component
    return <div>Loading Authentication for Apollo...</div>;
  }

  // Render the ApolloProvider with the configured client
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}
