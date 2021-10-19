import { useEffect } from "react";
import { useCallback } from "react";
import { useParams } from "react-router";
import { useFetch } from "../../../../../hooks";
import { userForumGetComments } from "../../../../../services";

const useComments = () => {
  const { resource: comments, handleFetchResource } = useFetch();
  const { id } = useParams();

  const fetcher = useCallback(async () => {
    const { comments } = await userForumGetComments(id);
    return comments;
  }, [id]);

  // Handle fetch category
  useEffect(() => {
    handleFetchResource({ fetcher });
  }, [handleFetchResource, fetcher]);

  return {
    comments,
  };
};

export default useComments;
