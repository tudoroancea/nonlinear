import { ErrorBoundary } from "react-error-boundary";
import { Outlet } from "react-router-dom";
import { ErrorScreen } from "@/components/error-screen";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/layout/app-sidebar";

export function AppLayout() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <div className="h-svh overflow-hidden lg:p-2 w-full">
        <div className="lg:border lg:rounded-md overflow-hidden flex flex-col items-center justify-start bg-container h-full w-full">
          <div className="w-full flex flex-col items-center">
            <div className="w-full flex justify-between items-center border-b py-1.5 px-6 h-10">
              <SidebarTrigger />
            </div>
          </div>
          <div className="overflow-auto h-[calc(100svh-80px)] lg:h-[calc(100svh-96px)] w-full">
            <ErrorBoundary fallback={<ErrorScreen />}>
              <Outlet />
            </ErrorBoundary>
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
}
