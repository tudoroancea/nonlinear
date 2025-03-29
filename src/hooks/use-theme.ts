import { actualThemeAtom } from "@/lib/atoms/theme";
import { useAtom } from "jotai";

export function useTheme() {
  const [theme] = useAtom(actualThemeAtom);
  return {
    theme,
  };
}
