import { ClerkProvider, useAuth } from "@clerk/clerk-react";
import { useSetAtom } from "jotai";
import { useEffect } from "react";
import { fetchGitHubTokenAtom } from "@/lib/atoms/github";

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;
if (!PUBLISHABLE_KEY) {
  throw new Error("PUBLISHABLE_KEY is not defined");
}

function AuthTokenHandler({ children }: { children: React.ReactNode }) {
  const { userId, isSignedIn } = useAuth();
  const fetchGitHubToken = useSetAtom(fetchGitHubTokenAtom);

  useEffect(() => {
    if (isSignedIn && userId) {
      fetchGitHubToken(userId);
    }
  }, [isSignedIn, userId, fetchGitHubToken]);

  return <>{children}</>;
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/">
      <AuthTokenHandler>{children}</AuthTokenHandler>
    </ClerkProvider>
  );
}
