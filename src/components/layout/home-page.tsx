import { Button } from "@/components/ui/button";
import { pinnedProjectsAtom, userDataAtom } from "@/lib/atoms/user-data";
import { useAtom } from "jotai";
import { Pin } from "lucide-react";
import { Link } from "react-router-dom";

export function HomePage() {
  const [userData] = useAtom(userDataAtom);
  const [pinnedProjects, setPinnedProjects] = useAtom(pinnedProjectsAtom);

  const togglePin = (e: React.MouseEvent, projectId: string) => {
    // Stop the event from bubbling up to the Link
    e.preventDefault();
    e.stopPropagation();

    if (pinnedProjects.includes(projectId)) {
      setPinnedProjects(pinnedProjects.filter((id) => id !== projectId));
    } else {
      setPinnedProjects([...pinnedProjects, projectId]);
    }
  };

  return (
    <div className="container mx-auto p-2">
      <h1 className="text-2xl font-bold mb-6">Projects Dashboard</h1>
      <div className="p-2">
        <h2 className="text-xl font-bold mb-4">Available Projects</h2>
        <p className="mb-4 text-muted-foreground">
          These are all GitHub Projects you have access to. Pin your favorite
          projects to have them available in the sidebar.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {userData.projects.map((project) => (
            <Link
              to={`/${userData.username}/${project.title}`}
              key={project.id}
              className="border rounded-md p-4 flex justify-between items-center hover:bg-muted/50"
            >
              <span className="font-medium">{project.title}</span>
              <Button
                size="sm"
                variant="ghost"
                onClick={(e) => togglePin(e, project.id)}
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
    </div>
  );
}
