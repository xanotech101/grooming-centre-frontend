import { useToast } from "@chakra-ui/toast";
import { useCallback } from "react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useFetchAndCache } from "../../../../../hooks";
import {
  userForumGetCategories,
  userForumPublishQuestion,
} from "../../../../../services";
import { capitalizeFirstLetter } from "../../../../../utils/formatString";

/**
 * Manages AddQuestionPage state
 *
 * @returns {{ formManager: ReactHookForm,  categories: { data: ?Array<{ value: string, label: string }>, loading: boolean, err: ?string }, handleSubmit: () => Promise<void>}}
 */
const useAddQuestionPage = () => {
  const toast = useToast();
  const { resource: categories, handleFetchResource } = useFetchAndCache();

  const fetcher = useCallback(async () => {
    const { categories } = await userForumGetCategories();
    return categories;
  }, []);
  // Handle fetch category
  useEffect(() => {
    handleFetchResource({ cacheKey: "forum-categories", fetcher });
  }, [handleFetchResource, fetcher]);

  // Handle category error
  useEffect(() => {
    if (categories.err) {
      toast({
        description: capitalizeFirstLetter(categories.err),
        position: "top",
        status: "error",
      });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categories.err]);

  const formManager = useForm();

  const handlePublishQuestion = async (question) => {
    try {
      const { message } = await userForumPublishQuestion(question);

      toast({
        description: capitalizeFirstLetter(message),
        position: "top",
        status: "success",
      });

      formManager.reset();
    } catch (err) {
      toast({
        description: capitalizeFirstLetter(err.message),
        position: "top",
        status: "error",
      });
    }
  };

  const handleSubmit = () => formManager.handleSubmit(handlePublishQuestion);

  return {
    categories,
    handleSubmit,
    formManager,
  };
};

export default useAddQuestionPage;
