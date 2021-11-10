import { useEffect } from "react";
import { useCallback } from "react";
import { useFetch, useQueryParams } from "../../../../../hooks";
import { userForumGetQuestions } from "../../../../../services";

const useQuestionsPage = () => {
  const { resource: questions, handleFetchResource } = useFetch();
  const tab = useQueryParams().get("tab");

  const fetcher = useCallback(async () => {
    const { questions } = await userForumGetQuestions({ tab });

    return questions;
  }, [tab]);

  // Handle fetch category
  useEffect(() => {
    handleFetchResource({ fetcher });
  }, [handleFetchResource, fetcher]);

  return {
    questions,
  };
};

export default useQuestionsPage;
