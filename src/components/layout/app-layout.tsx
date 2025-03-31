import { ErrorScreen } from "@/components/error-screen";
import { AppSidebar } from "@/components/layout/app-sidebar";
import { LoadingScreen } from "@/components/loading-screen";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { clerkUserIdAtom } from "@/lib/atoms/auth";
import { useAuth } from "@clerk/clerk-react";
import { useAtom } from "jotai";
import { Suspense, useEffect } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { Outlet } from "react-router-dom";
// import {
//   Breadcrumb,
//   BreadcrumbItem,
//   BreadcrumbLink,
//   BreadcrumbList,
//   BreadcrumbPage,
//   BreadcrumbSeparator,
// } from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";

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
        <Suspense fallback={<LoadingScreen message="Loading user data..." />}>
          <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
              <div className="px-4">
                <header className="flex h-12 shrink-0 items-center">
                  <SidebarTrigger className="-ml-1" />
                  {/* <Separator
                    id="separator"
                    orientation="vertical"
                    className="mr-2 h-4"
                  />
                  <Breadcrumb>
                    <BreadcrumbList>
                      <BreadcrumbItem className="hidden md:block">
                        <BreadcrumbLink href="/">Home</BreadcrumbLink>
                      </BreadcrumbItem>
                      <BreadcrumbSeparator className="hidden md:block" />
                      <BreadcrumbItem>
                        <BreadcrumbPage>Data Fetching</BreadcrumbPage>
                      </BreadcrumbItem>
                    </BreadcrumbList>
                  </Breadcrumb> */}
                </header>
                <Separator />
                <ErrorBoundary fallback={<ErrorScreen />}>
                  <Outlet />
                </ErrorBoundary>
              </div>
            </SidebarInset>
          </SidebarProvider>
        </Suspense>
      ) : (
        <LoadingScreen message="Signing in..." />
      )}
    </>
  );
}
