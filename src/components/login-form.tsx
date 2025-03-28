import { cn } from "@/lib/utils";
import { LoginButton } from "./auth-buttons";

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("flex flex-col gap-6 items-center", className)}
      {...props}
    >
      <img src="/logo.svg" alt="Logo" className="h-25" />
      <h1 className="text-xl font-bold self-center">Welcome to Nonlinear</h1>
      <LoginButton />
      {/* <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>.
      </div> */}
    </div>
  );
}
