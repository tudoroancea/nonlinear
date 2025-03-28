import { cn } from "@/lib/utils";
import { LoginButton } from "./auth-buttons";

export function LoginForm() {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-background p-6 md:p-10">
      <div className="w-full max-w-sm flex flex-col gap-6 items-center">
        <img src="/logo.svg" alt="Logo" className="h-25" />
        <h1 className="text-xl font-bold self-center">Welcome to Nonlinear</h1>
        <LoginButton />
      </div>
    </div>
  );
}
