import {
  ApolloClient,
  ApolloProvider,
  from,
  HttpLink,
  InMemoryCache,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { useAuth, useUser } from "@clerk/clerk-react";

interface ApolloClientProviderProps {
  children: React.ReactNode;
}

export default function ApolloClientProvider({
  children,
}: ApolloClientProviderProps) {
  const { getToken } = useAuth();
  const { user } = useUser();

  const httpLink = new HttpLink({ uri: "https://api.github.com/graphql" });

  const authLink = setContext(async (_, { headers }) => {
    const token = await getToken({ template: "github" });
    // user.get;
    // const token = import.meta.env.VITE_GH_TOKEN as string;
    console.log("token", token);
    return {
      headers: {
        ...headers,
        Authorization: token ? `Bearer ${token}` : "",
      },
    };
  });

  const client = new ApolloClient({
    link: from([authLink, httpLink]),
    cache: new InMemoryCache(),
  });

  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}
