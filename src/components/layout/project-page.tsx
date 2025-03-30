import { useParams } from "react-router-dom";
import { useAtomValue } from "jotai";
import { userDataAtom } from "@/lib/atoms/user-data";
import { Suspense } from "react";

const ProjectPageContent = () => {
  const { orgOrUser, project } = useParams();
  const userData = useAtomValue(userDataAtom);

  // Check if the current project is accessible to the user
  const isAuthorized = userData.username === orgOrUser;

  if (!isAuthorized) {
    return (
      <div className="max-w-xl mx-auto my-8 p-6 border border-red-400 bg-red-50 dark:bg-red-950 rounded-md text-center shadow-md">
        <h2 className="text-xl font-semibold text-red-600 dark:text-red-400 mb-3">Access Denied</h2>
        <p className="mt-2">
          You don't have permission to view the project {orgOrUser}/{project}.
          You are currently logged in as <span className="font-semibold">{userData.username}</span>.
        </p>
      </div>
    );
  }

  // Check if the project exists in userData
  const projectExists = userData.projects.some(p => p.title === project);
  
  if (!projectExists) {
    return (
      <div className="max-w-xl mx-auto my-8 p-6 border border-yellow-400 bg-yellow-50 dark:bg-yellow-950 rounded-md text-center shadow-md">
        <h2 className="text-xl font-semibold text-yellow-600 dark:text-yellow-400 mb-3">Project Not Found</h2>
        <p className="mt-2">
          The project "<span className="font-semibold">{project}</span>" doesn't exist in your GitHub projects.
        </p>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-2xl font-bold p-2">Project Page</h1>
      <p className="text-lg p-2">
        This is the project page for {orgOrUser}/{project}.
      </p>
    </div>
  );
};

export const ProjectPage = () => {
  return (
    <Suspense fallback={<div className="p-4 text-center my-8">Loading project information...</div>}>
      <ProjectPageContent />
    </Suspense>
  );
};
