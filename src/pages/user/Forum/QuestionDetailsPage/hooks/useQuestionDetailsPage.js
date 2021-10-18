import { useEffect } from "react";
import { useCallback } from "react";
import { useParams } from "react-router";
import { useFetch } from "../../../../../hooks";
import { userForumGetQuestionDetails } from "../../../../../services";

const useQuestionDetailsPage = () => {
  const { resource: question, handleFetchResource } = useFetch();
  const { id } = useParams();

  const fetcher = useCallback(async () => {
    const { question } = await userForumGetQuestionDetails(id);
    return question;
  }, [id]);

  // Handle fetch category
  useEffect(() => {
    handleFetchResource({ fetcher });
  }, [handleFetchResource, fetcher]);

  return {
    question,
  };
};

export default useQuestionDetailsPage;
