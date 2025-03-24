import { useParams } from "react-router-dom";

export const ProjectPage = () => {
  const { orgOrUser, project } = useParams();
  return (
    <div>
      <h1 className="text-2xl font-bold p-2">Project Page</h1>
      <p className="text-lg p-2">
        This is the project page for {orgOrUser}/{project}.
      </p>
    </div>
  );
};
