import { useQuery, gql } from "@apollo/client";

const GET_VIEWER = gql`
  query {
    viewer {
      login
      name
    }
  }
`;

const GET_PROJECTS = gql`
  query {
    viewer {
      projectsV2(first: 5) {
        nodes {
          id
          title
        }
      }
    }
  }
`;

function UserInfo() {
  const { loading, error, data } = useQuery(GET_VIEWER);

  if (loading) return <p>Loading...</p>;
  if (error)
    return (
      <pre className="bg-gray-100 h-full dark:bg-gray-900 p-4 rounded-md overflow-auto text-body text-sm">
        Error: {JSON.stringify(error, null, 2)}
      </pre>
    );

  return (
    <div className="p-2">
      <h2 className="text-lg font-bold">User Info</h2>
      <p>Logged in as: {data.viewer.login}</p>
      <p>Name: {data.viewer.name}</p>
    </div>
  );
}

function Projects() {
  const { loading, error, data } = useQuery(GET_PROJECTS);

  if (loading) return <p>Loading...</p>;
  if (error)
    return (
      <pre className="bg-gray-100 h-full dark:bg-gray-900 p-4 rounded-md overflow-auto text-body text-sm">
        Error: {JSON.stringify(error, null, 2)}
      </pre>
    );

  return (
    <div className="p-2">
      <h2 className="text-lg font-bold">Projects</h2>
      <ul className="list-disc list-inside">
        {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
        {data.viewer.projectsV2.nodes.map((project: any) => (
          <li key={project.id}>{project.title}</li>
        ))}
      </ul>
    </div>
  );
}

export function HomePage() {
  return (
    <div>
      <h1 className="text-2xl font-bold p-2">Home page</h1>
      <UserInfo />
      <Projects />
    </div>
  );
}
