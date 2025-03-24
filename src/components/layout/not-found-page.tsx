import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { FileQuestion } from "lucide-react";

export const NotFoundPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 text-center">
      <div className="max-w-md space-y-6">
        <div className="flex justify-center">
          <FileQuestion className="h-24 w-24 text-muted-foreground" />
        </div>

        <h1 className="text-4xl font-bold">404</h1>

        <div className="space-y-4">
          <h2 className="text-2xl font-semibold">Page Not Found</h2>

          <p className="text-muted-foreground">
            The URL you're trying to access doesn't correspond to any existing
            project or issue in our system.
          </p>
        </div>

        <Link to="/">
          <Button className="mt-4" size="lg">
            Return to Homepage
          </Button>
        </Link>
      </div>
    </div>
  );
};
