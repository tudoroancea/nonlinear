import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";

export type Theme = "dark" | "light" | "system";

const THEME_KEY = "vite-ui-theme";

export const themeAtom = atomWithStorage<Theme>(THEME_KEY, "system");

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
