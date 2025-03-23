import { useAtom } from "jotai";
import { themeAtom, setThemeAtom } from "@/lib/atoms/theme";

export function useTheme() {
  const [theme] = useAtom(themeAtom);
  const [, setTheme] = useAtom(setThemeAtom);

  return {
    theme,
    setTheme,
  };
}
