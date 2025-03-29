import { ThemeSelector } from "../theme-toggle";

export const SettingsPage = () => {
  return (
    <div className="flex flex-col p-2 gap-5">
      <h1 className="text-2xl font-bold">Settings page</h1>
      <div className="flex flex-row gap-2">
        <h2 className="text-xl">Theme</h2>
        <ThemeSelector />
      </div>
    </div>
  );
};
