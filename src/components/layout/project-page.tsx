import { useParams } from "react-router-dom";

export const ProjectPage = () => {
  const { orgOrUser, project } = useParams();
  return (
    <div>
      <h1>Project Page</h1>
      <p>
        This is the project page for {orgOrUser}/{project}.
      </p>
    </div>
  );
};
