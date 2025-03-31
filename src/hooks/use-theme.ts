import { actualThemeAtom } from "@/lib/atoms/theme";
import { useAtomValue } from "jotai";

export function useTheme() {
  const theme = useAtomValue(actualThemeAtom);
  return { theme };
}
