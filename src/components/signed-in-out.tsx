import { useAuth0 } from "@auth0/auth0-react";

export const SignedIn: React.FC<React.PropsWithChildren> = ({ children }) => {
  const { isAuthenticated } = useAuth0();
  if (!isAuthenticated) return null;
  return children;
};

export const SignedOut: React.FC<React.PropsWithChildren> = ({ children }) => {
  const { isAuthenticated } = useAuth0();
  if (isAuthenticated) return null;
  return children;
};
