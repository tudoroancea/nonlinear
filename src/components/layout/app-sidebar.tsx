import { Button } from "@/components/ui/button";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
} from "@/components/ui/sidebar";
import { pinnedProjectsAtom, userDataAtom } from "@/lib/atoms/user-data";
import { UserButton } from "@clerk/clerk-react";
import { useAtom } from "jotai";
import { HelpCircle, Settings } from "lucide-react";
import { Link } from "react-router-dom";

export function AppSidebar() {
  const [pinnedProjects] = useAtom(pinnedProjectsAtom);
  const [userData] = useAtom(userDataAtom);

  // Get pinned project details
  const pinnedProjectDetails = userData.projects.filter((project) =>
    pinnedProjects.includes(project.id),
  );

  return (
    <Sidebar collapsible="offcanvas">
      <SidebarHeader>
        <Link to="/" className="flex items-center p-2">
          <img src="/logo.svg" alt="Logo" className="h-15" />
          <h1 className="text-2xl font-bold pl-2">Nonlinear</h1>
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <div className="p-3">
          <h3 className="text-sm font-semibold mb-2 text-muted-foreground">
            Pinned Projects
          </h3>
          {pinnedProjectDetails.length > 0 ? (
            <ul className="space-y-1">
              {pinnedProjectDetails.map((project) => (
                <li key={project.id}>
                  <Link
                    to={`/project/${project.title}`}
                    className="flex items-center py-1 px-2 rounded hover:bg-muted text-sm"
                  >
                    {project.title}
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-muted-foreground">
              No pinned projects yet. Pin projects from the home page.
            </p>
          )}
        </div>
      </SidebarContent>
      <SidebarFooter>
        <div className="w-full flex items-center justify-between">
          <UserButton />
          <Link to="/settings">
            <Button id="settings-button" size="icon" variant="outline">
              <Settings className="size-4" />
            </Button>
          </Link>
          <Link to="/about">
            <Button id="help-button" size="icon" variant="outline">
              <HelpCircle className="size-4" />
            </Button>
          </Link>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
