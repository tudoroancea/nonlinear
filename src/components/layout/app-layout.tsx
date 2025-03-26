import { Outlet } from "react-router-dom";
import { SidebarProvider, SidebarTrigger } from "../ui/sidebar";
import { AppSidebar } from "./app-sidebar";
import { SignIn, SignedIn, SignedOut } from "@clerk/clerk-react";

export function AppLayout() {
  return (
    <>
      <SignedOut>
        <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-background p-6 md:p-10">
          <div className="w-full max-w-sm">
            <SignIn />
          </div>
        </div>
      </SignedOut>
      <SignedIn>
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
                <Outlet />
              </div>
            </div>
          </div>
        </SidebarProvider>
      </SignedIn>
    </>
  );
}
