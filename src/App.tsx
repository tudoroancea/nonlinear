import { GraphQLProvider } from "@/components/graphql-provider";
import { AuthProvider } from "@/components/auth-provider";
import { AboutPage } from "@/components/layout/about-page";
import { AppLayout } from "@/components/layout/app-layout";
import { HomePage } from "@/components/layout/home-page";
import { NotFoundPage } from "@/components/layout/not-found-page";
import { ProjectPage } from "@/components/layout/project-page";
import { SettingsPage } from "@/components/layout/settings-page";
import { LoginForm } from "@/components/login-form";
import { SignedIn, SignedOut } from "@clerk/clerk-react";
import { ThemeEffect } from "@/components/theme-effect";
import { Provider as JotaiProvider } from "jotai";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

export function App() {
  return (
    <AuthProvider>
      <GraphQLProvider>
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
      </GraphQLProvider>
    </AuthProvider>
  );
}
