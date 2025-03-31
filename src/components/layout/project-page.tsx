import { Button } from "@/components/ui/button";
import { ProjectDetailsDocument } from "@/generated/graphql";
import { graphqlClientAtom } from "@/lib/atoms/graphql-client";
import { userDataAtom } from "@/lib/atoms/user-data";
import { useSuspenseQuery } from "@apollo/client";
import { useAtomValue } from "jotai";
import { AlertCircle, FileQuestion } from "lucide-react";
import { Suspense } from "react";
import { Link, useParams } from "react-router-dom";
import { LoadingScreen } from "../loading-screen";

interface ProjectPageProps {
  orgOrUser: string;
  project: string;
}

// Security error components
const AccessDeniedError = ({
  orgOrUser,
  project,
  username,
}: ProjectPageProps & {
  username: string;
}) => (
  <div className="max-w-xl mx-auto my-8 p-6 border border-red-400 bg-red-50 dark:bg-red-950 rounded-md text-center shadow-md">
    <div className="flex justify-center mb-4">
      <AlertCircle className="h-12 w-12 text-red-600 dark:text-red-400" />
    </div>
    <h2 className="text-xl font-semibold text-red-600 dark:text-red-400 mb-3">
      Access Denied
    </h2>
    <p className="mt-2">
      You don't have permission to view the project {orgOrUser}/{project}. You
      are currently logged in as{" "}
      <span className="font-semibold">{username}</span>.
    </p>
    <Link to="/">
      <Button variant="outline" className="mt-4">
        Return to Homepage
      </Button>
    </Link>
  </div>
);

const ProjectNotFoundError = ({
  project,
}: Pick<ProjectPageProps, "project">) => (
  <div className="max-w-xl mx-auto my-8 p-6 border border-yellow-400 bg-yellow-50 dark:bg-yellow-950 rounded-md text-center shadow-md">
    <div className="flex justify-center mb-4">
      <FileQuestion className="h-12 w-12 text-yellow-600 dark:text-yellow-400" />
    </div>
    <h2 className="text-xl font-semibold text-yellow-600 dark:text-yellow-400 mb-3">
      Project Not Found
    </h2>
    <p className="mt-2">
      The project "<span className="font-semibold">{project}</span>" doesn't
      exist in your GitHub projects.
    </p>
    <Link to="/">
      <Button variant="outline" className="mt-4">
        Return to Homepage
      </Button>
    </Link>
  </div>
);

// This component fetches data and then delegates to the appropriate renderer
// based on authorization status
const ProjectPageContent = ({ orgOrUser, project }: ProjectPageProps) => {
  const userData = useAtomValue(userDataAtom);

  // First check: does the project exist in userData?
  const projectExists = userData.projects.some((p) => p.title === project);

  // Second check: is the current user authorized to access this project?
  const isAuthorized = userData.username === orgOrUser;

  // Only get the project ID and run the query if the project exists and user is authorized
  const projectId =
    projectExists && isAuthorized
      ? userData.projects.find((p) => p.title === project)?.id
      : undefined;

  // Always call useSuspenseQuery to follow hooks rules, but skip the actual query
  // if security checks fail
  const graphqlClient = useAtomValue(graphqlClientAtom);
  const projectDetails = useSuspenseQuery(ProjectDetailsDocument, {
    client: graphqlClient,
    variables: { projectId: projectId || "" },
    skip: !projectId, // Skip if projectId is undefined (due to security checks)
  });

  // Return the appropriate component based on security checks
  if (!isAuthorized) {
    return (
      <AccessDeniedError
        orgOrUser={orgOrUser}
        project={project}
        username={userData.username}
      />
    );
  }

  if (!projectExists) {
    return <ProjectNotFoundError project={project} />;
  }

  // If we've passed all security checks, render the actual project content
  return (
    <div>
      <h1 className="text-2xl font-bold p-2">Project Page</h1>
      <p className="text-lg p-2">
        This is the project page for {orgOrUser}/{project}.
      </p>
      <p className="text-lg p-2">{projectDetails?.data?.node?.__typename}</p>
    </div>
  );
};

export const ProjectPage = () => {
  const { orgOrUser, project } = useParams(); // Route params
  return (
    <Suspense
      fallback={
        <LoadingScreen
          message={`Loading information for project ${orgOrUser}/${project}`}
          logo={false}
        />
      }
    >
      <ProjectPageContent orgOrUser={orgOrUser || ""} project={project || ""} />
    </Suspense>
  );
};
