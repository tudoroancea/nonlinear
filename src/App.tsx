import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeEffect } from "@/components/theme-effect";
import { Provider } from "jotai";
import { AppLayout } from "@/components/layout/app-layout";
import { HomePage } from "@/components/layout/home-page";
import { AboutPage } from "./components/layout/about-page";
import { SettingsPage } from "./components/layout/settings-page";
import { ProjectPage } from "./components/layout/project-page";

function App() {
  return (
    <Provider>
      <ThemeEffect />
      <Router>
        <Routes>
          <Route element={<AppLayout />}>
            <Route index element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="/:orgOrUser/:project" element={<ProjectPage />} />
          </Route>
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
