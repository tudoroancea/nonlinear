import { useQuery, gql } from "@apollo/client";

const GET_VIEWER = gql`
  query GetViewer {
    viewer {
      login
      name
    }
  }
`;

function MyComponent() {}

export default MyComponent;

export function HomePage() {
  const { loading, error, data } = useQuery(GET_VIEWER);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h1 className="text-2xl font-bold p-2">Home page</h1>
      <p>Logged in as: {data.viewer.login}</p>
      <p>Name: {data.viewer.name}</p>
    </div>
  );
}
