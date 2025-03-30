import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface LoadingScreenProps {
  message?: string;
  className?: string;
}

export function LoadingScreen({
  message = "Loading your projects...",
  className,
}: LoadingScreenProps) {
  return (
    <div
      className={cn(
        "flex h-svh w-full flex-col items-center justify-center gap-8 bg-background p-6",
        className,
      )}
    >
      <div className="flex flex-col items-center gap-6">
        <img src="/logo.svg" alt="Nonlinear Logo" className="h-20 w-auto" />
        <h1 className="text-2xl font-bold text-foreground">Nonlinear</h1>
      </div>

      <div className="flex flex-col items-center gap-3">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <p className="text-center text-muted-foreground">{message}</p>
      </div>
    </div>
  );
}
