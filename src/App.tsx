import { ClerkProvider } from "@clerk/clerk-react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeEffect } from "@/components/theme-effect";
import { Provider } from "jotai";
import { AppLayout } from "@/components/layout/app-layout";
import { HomePage } from "@/components/layout/home-page";
import { AboutPage } from "./components/layout/about-page";
import { SettingsPage } from "./components/layout/settings-page";
import { ProjectPage } from "./components/layout/project-page";
import { NotFoundPage } from "./components/layout/not-found-page";
import ApolloClientProvider from "./components/apollo-provider";

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;
if (!PUBLISHABLE_KEY) {
  throw new Error("PUBLISHABLE_KEY is not defined");
}

function App() {
  return (
    <ClerkProvider publishableKey={PUBLISHABLE_KEY!} afterSignOutUrl="/">
      <ApolloClientProvider>
        <Provider>
          <ThemeEffect />
          <Router>
            <Routes>
              <Route element={<AppLayout />}>
                <Route index element={<HomePage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/settings" element={<SettingsPage />} />
                <Route path="/:orgOrUser/:project" element={<ProjectPage />} />
                <Route path="*" element={<NotFoundPage />} />
              </Route>
            </Routes>
          </Router>
        </Provider>
      </ApolloClientProvider>
    </ClerkProvider>
  );
}

export default App;
