import { useTheme } from "@/hooks/use-theme";
import { clerkUserIdAtom } from "@/lib/atoms/auth";
import { ClerkProvider, useAuth } from "@clerk/clerk-react";
import { dark } from "@clerk/themes";
import { useAtom } from "jotai";
import { Suspense, useEffect } from "react";
import { LoadingScreen } from "./loading-screen";

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;
if (!PUBLISHABLE_KEY) {
  throw new Error("PUBLISHABLE_KEY is not defined");
}

function AuthTokenHandler({ children }: { children: React.ReactNode }) {
  const { userId, isSignedIn } = useAuth();
  const [clerkUserId, setClerkUserId] = useAtom(clerkUserIdAtom);

  useEffect(() => {
    if (isSignedIn && userId) {
      setClerkUserId(userId);
    }
  }, [isSignedIn, setClerkUserId, userId]);

  // Only render the children once the clerkUserId has been set and we can start the chain
  // fetch github token -> create graphql client -> query user data
  return (
    <>
      {clerkUserId ? (
        <Suspense fallback={<LoadingScreen message="Loading data..." />}>
          {children}
        </Suspense>
      ) : (
        <LoadingScreen message="Signing in..." />
      )}
    </>
  );
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { theme } = useTheme();
  return (
    <ClerkProvider
      publishableKey={PUBLISHABLE_KEY}
      afterSignOutUrl="/"
      appearance={{ baseTheme: theme == "light" ? undefined : dark }}
    >
      <AuthTokenHandler>{children}</AuthTokenHandler>
    </ClerkProvider>
  );
}
