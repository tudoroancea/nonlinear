import { ClerkProvider } from "@clerk/clerk-react";

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;
console.log("CLERK_PUBLISHABLE_KEY", PUBLISHABLE_KEY);
if (!PUBLISHABLE_KEY) {
  throw new Error("PUBLISHABLE_KEY is not defined");
}

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider publishableKey={PUBLISHABLE_KEY!} afterSignOutUrl="/">
      {children}
    </ClerkProvider>
  );
}
