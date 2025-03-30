import { ErrorScreen } from "@/components/error-screen";
import { AppSidebar } from "@/components/layout/app-sidebar";
import { LoadingScreen } from "@/components/loading-screen";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { clerkUserIdAtom } from "@/lib/atoms/auth";
import { useAuth } from "@clerk/clerk-react";
import { useAtom } from "jotai";
import { Suspense, useEffect } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { Outlet } from "react-router-dom";

export function AppLayout() {
  const { userId } = useAuth();
  const [clerkUserId, setClerkUserId] = useAtom(clerkUserIdAtom);

  // Check that we are indeed signed in and set the clerk Id
  useEffect(() => {
    if (userId) {
      setClerkUserId(userId);
    }
  }, [setClerkUserId, userId]);

  // Only render the children once the clerkUserId has been set and we can start the chain
  // fetch github token -> create graphql client -> query user data
  return (
    <>
      {clerkUserId ? (
        <Suspense fallback={<LoadingScreen message="Loading data..." />}>
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
        </Suspense>
      ) : (
        <LoadingScreen message="Signing in..." />
      )}
    </>
  );
}
