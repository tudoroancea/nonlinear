import { useAtomValue } from "jotai";
import { useEffect } from "react";
import { themeAtom } from "@/lib/atoms/theme";

export function ThemeEffect() {
  const theme = useAtomValue(themeAtom);

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove("light", "dark");

    if (theme === "system") {
      // For system theme, we need to check the preference and apply it
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
        .matches
        ? "dark"
        : "light";

      root.classList.add(systemTheme);

      // Set up listener for system theme changes
      const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
      const handleChange = () => {
        root.classList.remove("light", "dark");
        root.classList.add(mediaQuery.matches ? "dark" : "light");
      };

      mediaQuery.addEventListener("change", handleChange);
      return () => mediaQuery.removeEventListener("change", handleChange);
    } else {
      // For explicit light/dark themes, just apply the class
      root.classList.add(theme);
    }
  }, [theme]);

  return null;
}
