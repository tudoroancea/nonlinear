import { Sidebar, SidebarContent, SidebarHeader } from "../ui/sidebar";

export function AppSidebar() {
  return (
    <Sidebar collapsible="offcanvas">
      <SidebarHeader>
        <h1>My App</h1>
      </SidebarHeader>
      <SidebarContent>
        <ul>
          <li>Item 1</li>
          <li>Item 2</li>
          <li>Item 3</li>
        </ul>
      </SidebarContent>
    </Sidebar>
  );
}
