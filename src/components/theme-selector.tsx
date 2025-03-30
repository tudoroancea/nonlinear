// TODO: rename this file
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Theme, themeAtom } from "@/lib/atoms/theme";
import { useAtom } from "jotai";
import { Moon, Sun, ComputerIcon } from "lucide-react";

export function ThemeSelector() {
  const [theme, setTheme] = useAtom(themeAtom);

  // Map each theme to its corresponding icon
  const themeIcons: Record<Theme, React.ElementType> = {
    light: Sun,
    dark: Moon,
    system: ComputerIcon,
  };

  // All possible theme values
  const themes: Theme[] = ["light", "dark", "system"];

  return (
    <Select
      onValueChange={(t) => setTheme(t as Theme)}
      defaultValue={theme as string}
    >
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Theme" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {themes.map((themeValue) => {
            const Icon = themeIcons[themeValue];
            return (
              <SelectItem key={themeValue} value={themeValue}>
                <div className="flex items-center gap-2">
                  <Icon className="h-4 w-4" />
                  <span>
                    {themeValue.charAt(0).toUpperCase() + themeValue.slice(1)}
                  </span>
                </div>
              </SelectItem>
            );
          })}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
