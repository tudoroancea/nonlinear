import { useAtom } from "jotai";
import {
  userInfoAtom,
  projectsAtom,
  pinnedProjectsAtom,
} from "@/lib/atoms/github-data";
import { useGitHubData } from "@/hooks/use-github-data";
import { Button } from "../ui/button";
import { Pin, Star } from "lucide-react";
import { Link } from "react-router-dom";

function UserInfo() {
  const [userInfo] = useAtom(userInfoAtom);

  if (userInfo.loading) return <p>Loading...</p>;
  if (userInfo.error)
    return (
      <pre className="bg-gray-100 dark:bg-gray-900 p-4 rounded-md overflow-auto text-sm">
        Error: {JSON.stringify(userInfo.error, null, 2)}
      </pre>
    );

  if (!userInfo.data) return null;

  return (
    <div className="p-2">
      <h2 className="text-lg font-bold">User Info</h2>
      <p>Logged in as: {userInfo.data.login}</p>
      <p>Name: {userInfo.data.name || "N/A"}</p>
    </div>
  );
}

function ProjectsList() {
  const [projects] = useAtom(projectsAtom);
  const [pinnedProjects, setPinnedProjects] = useAtom(pinnedProjectsAtom);

  if (projects.loading) return <p>Loading projects...</p>;
  if (projects.error)
    return (
      <pre className="bg-gray-100 dark:bg-gray-900 p-4 rounded-md overflow-auto text-sm">
        Error: {JSON.stringify(projects.error, null, 2)}
      </pre>
    );

  // Toggle pin status of a project
  const togglePin = (projectId: string) => {
    if (pinnedProjects.includes(projectId)) {
      setPinnedProjects(pinnedProjects.filter((id) => id !== projectId));
    } else {
      setPinnedProjects([...pinnedProjects, projectId]);
    }
  };

  return (
    <div className="p-2">
      <h2 className="text-xl font-bold mb-4">Available Projects</h2>
      <p className="mb-4 text-muted-foreground">
        These are all GitHub Projects you have access to. Pin your favorite
        projects to have them available in the sidebar.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {projects.data.map((project) => (
          <Link
            to={`/project/${project.title}`}
            key={project.id}
            className="border rounded-md p-4 flex justify-between items-center hover:bg-muted/50"
          >
            <span className="font-medium">{project.title}</span>
            <Button
              size="sm"
              variant="ghost"
              onClick={() => togglePin(project.id)}
              title={
                pinnedProjects.includes(project.id)
                  ? "Unpin project"
                  : "Pin project"
              }
            >
              {pinnedProjects.includes(project.id) ? (
                <Pin className="h-4 w-4 fill-primary text-primary" />
              ) : (
                <Pin className="h-4 w-4" />
              )}
            </Button>
          </Link>
        ))}
      </div>
    </div>
  );
}

export function HomePage() {
  // Initialize GitHub data fetching
  useGitHubData();

  return (
    <div className="container mx-auto p-2">
      <h1 className="text-2xl font-bold mb-6">Projects Dashboard</h1>
      <ProjectsList />
    </div>
  );
}
