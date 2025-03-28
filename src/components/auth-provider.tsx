// import { ClerkProvider } from "@clerk/clerk-react";

// const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;
// console.log("CLERK_PUBLISHABLE_KEY", PUBLISHABLE_KEY);
// if (!PUBLISHABLE_KEY) {
//   throw new Error("PUBLISHABLE_KEY is not defined");
// }

// export default function AuthProvider({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   return (
//     <ClerkProvider publishableKey={PUBLISHABLE_KEY!} afterSignOutUrl="/">
//       {children}
//     </ClerkProvider>
//   );
// }

import { Auth0Provider } from "@auth0/auth0-react";

const domain = import.meta.env.VITE_AUTH0_DOMAIN;
const clientId = import.meta.env.VITE_AUTH0_CLIENT_ID;
const redirectUri = window.location.origin; // Auth0 redirects back to the app root

console.log("VITE_AUTH0_DOMAIN", domain);
console.log("VITE_AUTH0_CLIENT_ID", clientId);

if (!domain || !clientId) {
  throw new Error(
    "Auth0 Domain or Client ID not found in environment variables.",
  );
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  return (
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      authorizationParams={{
        redirect_uri: redirectUri,
        // Optional: Specify audience/scope if calling your OWN API secured by Auth0
        // audience: "YOUR_API_IDENTIFIER",
        // scope: "openid profile email read:your_api",

        // Note: GitHub scopes are configured in the Auth0 Dashboard Connection settings
      }}
      // Optional: Cache tokens in local storage for better persistence
      // cacheLocation="localstorage"
    >
      {children}
    </Auth0Provider>
  );
}
