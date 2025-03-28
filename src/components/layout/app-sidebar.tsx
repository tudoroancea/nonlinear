import { HelpCircle, Settings } from "lucide-react";
import { Link } from "react-router-dom";
import { ThemeToggle } from "../theme-toggle";
import { Button } from "../ui/button";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
} from "../ui/sidebar";
import { UserButton } from "@clerk/clerk-react";

export function AppSidebar() {
  return (
    <Sidebar collapsible="offcanvas">
      <SidebarHeader>
        <Link to="/" className="flex items-center p-2">
          <img src="/logo.svg" alt="Logo" className="h-15" />
          <h1 className="text-2xl font-bold pl-2">Nonlinear</h1>
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <ul className="p-3">
          <li>Item 1</li>
          <li>Item 2</li>
          <li>Item 3</li>
        </ul>
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
          <ThemeToggle />
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
