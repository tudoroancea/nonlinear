import {
  ApolloClient,
  InMemoryCache,
  HttpLink,
  ApolloProvider,
  from,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { useAuth } from "@clerk/clerk-react";

export default function ApolloClientProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { getToken } = useAuth();

  const httpLink = new HttpLink({ uri: "https://api.github.com/graphql" });

  const authLink = setContext(async (_, { headers }) => {
    const token = await getToken({ template: "github" });
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
