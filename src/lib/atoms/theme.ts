import { atom } from "jotai";

export type Theme = "dark" | "light" | "system";

// Load initial theme from localStorage or use default
const getInitialTheme = (): Theme => {
  if (typeof window !== "undefined") {
    const storedTheme = localStorage.getItem("vite-ui-theme") as Theme;
    return storedTheme || "system";
  }
  return "system";
};

// Create the theme atom
export const themeAtom = atom<Theme>(getInitialTheme());

// Derived atom for getting the actual theme based on system preference
export const actualThemeAtom = atom((get) => {
  const theme = get(themeAtom);

  if (theme !== "system" || typeof window === "undefined") {
    return theme;
  }

  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
});

// Write-only atom for setting the theme
export const setThemeAtom = atom(null, (_, set, newTheme: Theme) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("vite-ui-theme", newTheme);
  }
  set(themeAtom, newTheme);
});
