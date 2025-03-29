import { SignIn } from "@clerk/clerk-react";

export function LoginForm() {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-background p-6 md:p-10">
      <img src="/logo.svg" alt="Logo" className="h-25" />
      <SignIn withSignUp={false} appearance={{}} />
    </div>
  );
}
