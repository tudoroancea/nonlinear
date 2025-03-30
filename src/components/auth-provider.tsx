import { useTheme } from "@/hooks/use-theme";
import { ClerkProvider } from "@clerk/clerk-react";
import { dark } from "@clerk/themes";

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;
if (!PUBLISHABLE_KEY) {
  throw new Error("PUBLISHABLE_KEY is not defined");
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { theme } = useTheme();
  return (
    <ClerkProvider
      publishableKey={PUBLISHABLE_KEY}
      afterSignOutUrl="/"
      appearance={{ baseTheme: theme == "light" ? undefined : dark }}
    >
      {children}
    </ClerkProvider>
  );
}
