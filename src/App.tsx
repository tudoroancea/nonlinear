import { ApolloClientProvider } from "@/components/apollo-provider";
import { AuthProvider } from "@/components/auth-provider";
import { AboutPage } from "@/components/layout/about-page";
import { AppLayout } from "@/components/layout/app-layout";
import { HomePage } from "@/components/layout/home-page";
import { NotFoundPage } from "@/components/layout/not-found-page";
import { ProjectPage } from "@/components/layout/project-page";
import { SettingsPage } from "@/components/layout/settings-page";
import { LoginForm } from "@/components/login-form";
import { SignedIn, SignedOut } from "@/components/signed-in-out";
import { ThemeEffect } from "@/components/theme-effect";
import { Provider as JotaiProvider } from "jotai";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

export function App() {
  return (
    <AuthProvider>
      <ApolloClientProvider>
        <JotaiProvider>
          <ThemeEffect />
          <Router>
            <SignedOut>
              <LoginForm />
            </SignedOut>
            <SignedIn>
              <Routes>
                <Route element={<AppLayout />}>
                  <Route index element={<HomePage />} />
                  <Route path="/about" element={<AboutPage />} />
                  <Route path="/settings" element={<SettingsPage />} />
                  <Route
                    path="/:orgOrUser/:project"
                    element={<ProjectPage />}
                  />
                  <Route path="*" element={<NotFoundPage />} />
                </Route>
              </Routes>
            </SignedIn>
          </Router>
        </JotaiProvider>
      </ApolloClientProvider>
    </AuthProvider>
  );
}

// import React from "react";
// import { useAuth0 } from "@auth0/auth0-react";
// import { LoginButton, LogoutButton } from "@/components/auth-buttons";
// import GitHubApiComponent from "@/components/github-api-component";
// import { SignedIn, SignedOut } from "./components/signed-in-out";

// const App: React.FC = () => {
//   const { isAuthenticated, isLoading, error } = useAuth0();

//   if (isLoading) {
//     return <div>Loading Application...</div>;
//   }

//   if (error) {
//     return <div>Oops... {error.message}</div>;
//   }

//   return (
//     <div>
//       <h1>Auth0 + GitHub Example</h1>
//       <nav>
//         {/* Add navigation links if needed */}
//         {/* <Link to="/">Home</Link> */}
//       </nav>
//       <hr />

//       {!isAuthenticated && (
//         <>
//           <p>You are not logged in.</p>
//           <LoginButton />
//         </>
//       )}

//       {isAuthenticated && (
//         <>
//           <LogoutButton />
//           <hr />
//           <GitHubApiComponent />
//         </>
//       )}
//     </div>
//   );
// };

// export default App;
