import { useCallback } from "react";
import { useFetch } from "../../../../../hooks";
import { userForumGetQuestionsByTag } from "../../../../../services";

const useTagsPage = () => {
  const {
    resource: questions,
    setResource: setQuestions,
    handleFetchResource,
  } = useFetch();

  const fetcher = useCallback(
    (tagId) => async () => {
      const { questions } = await userForumGetQuestionsByTag(tagId);

      return questions;
    },
    []
  );

  const handleTagQuestionsSearch = (tagId) =>
    handleFetchResource({ fetcher: fetcher(tagId) });

  const handleClearQuestionsData = () => {
    setQuestions((prev) => ({ ...prev, data: null }));
  };

  return {
    questions,
    handleTagQuestionsSearch,
    handleClearQuestionsData,
  };
};

export default useTagsPage;
