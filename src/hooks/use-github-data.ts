import { useEffect } from "react";
import { useAtom } from "jotai";
import { useQuery, gql } from "@apollo/client";
import { userInfoAtom, projectsAtom } from "@/lib/atoms/github-data";

const GET_VIEWER = gql`
  query {
    viewer {
      login
      name
    }
  }
`;

const GET_PROJECTS = gql`
  query {
    viewer {
      projectsV2(first: 20) {
        nodes {
          id
          title
        }
      }
    }
  }
`;

export function useGitHubData() {
  const [userInfo, setUserInfo] = useAtom(userInfoAtom);
  const [projects, setProjects] = useAtom(projectsAtom);

  const {
    loading: userLoading,
    error: userError,
    data: userData,
  } = useQuery(GET_VIEWER);

  const {
    loading: projectsLoading,
    error: projectsError,
    data: projectsData,
  } = useQuery(GET_PROJECTS);

  // Update user info atom
  useEffect(() => {
    if (!userLoading) {
      setUserInfo({
        loading: userLoading,
        error: userError ? userError : null,
        data: userData?.viewer || null,
      });
    }
  }, [userLoading, userError, userData, setUserInfo]);

  // Update projects atom
  useEffect(() => {
    if (!projectsLoading) {
      setProjects({
        loading: projectsLoading,
        error: projectsError ? projectsError : null,
        data: projectsData?.viewer?.projectsV2?.nodes || [],
      });
    }
  }, [projectsLoading, projectsError, projectsData, setProjects]);

  return {
    userInfo,
    projects,
  };
}
