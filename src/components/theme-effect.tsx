import { useAtomValue } from "jotai";
import { useEffect } from "react";
import { actualThemeAtom } from "@/lib/atoms/theme";

export function ThemeEffect() {
  const actualTheme = useAtomValue(actualThemeAtom);

  useEffect(() => {
    const root = window.document.documentElement;

    root.classList.remove("light", "dark");
    root.classList.add(actualTheme);
  }, [actualTheme]);

  return null;
}
