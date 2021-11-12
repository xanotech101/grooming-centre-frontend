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

  const handleFetch = useCallback(
    () => handleFetchResource({ fetcher }),
    [fetcher, handleFetchResource]
  );

  // Handle fetch category
  useEffect(() => {
    handleFetch();
  }, [handleFetch]);

  return {
    questions,
    handleFetch,
  };
};

export default useQuestionsPage;
