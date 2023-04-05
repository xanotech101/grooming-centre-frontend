import { useEffect } from "react";
import { useCallback } from "react";
import { useFetch } from "../../../../../hooks";
import { userForumGetYourQuestions } from "../../../../../services";

const useQuestionsPage = () => {
  const { resource: questions, handleFetchResource } = useFetch();

  const handleFetch = useCallback(() => {
    handleFetchResource({
      fetcher: async () => {
        const { questions } = await userForumGetYourQuestions();

        console.log(questions);

        return questions;
      },
    });
  }, [handleFetchResource]);

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
