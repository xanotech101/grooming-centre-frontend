import { useToast } from "@chakra-ui/toast";
import { useCallback } from "react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useApp } from "../../../../../contexts";
import { useFetchAndCache } from "../../../../../hooks";
import {
  userForumGetCategories,
  userForumPublishQuestion,
} from "../../../../../services";
import { capitalizeFirstLetter } from "../../../../../utils/formatString";

/**
 * Manages AddQuestionPage state
 * @param {{ selectedTags: Array<{ id: string, label: string }>, handleClearAllSelectedTags: () => }} props
 *
 * @returns {{ formManager: ReactHookForm, categories: { data: ?Array<{ value: string, label: string }>, loading: boolean, err: ?string }, handleSubmit: () => Promise<void> }}
 */
const useAddQuestionPage = ({ selectedTags, handleClearAllSelectedTags }) => {
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
  const {
    state: { user },
  } = useApp();

  const handlePublishQuestion = async (question) => {
    try {
      if (!selectedTags.length)
        throw new Error("Please select at least one tag");

      console.log(selectedTags);

      const { message } = await userForumPublishQuestion({
        title: question.title,
        question: question.question,
        categoryId: question.categoryId,
        tagId: selectedTags.reduce((prev, tag) => [...prev, tag.id], []),
        userId: user?.id,
      });

      toast({
        description: capitalizeFirstLetter(message),
        position: "top",
        status: "success",
      });

      formManager.reset();
      handleClearAllSelectedTags();
    } catch (err) {
      toast({
        description: capitalizeFirstLetter(err.message),
        position: "top",
        status: "error",
      });
    }
  };

  const handleSubmit = () => formManager.handleSubmit(handlePublishQuestion);

  const disableForm = formManager.formState.isSubmitting || !user;

  return {
    categories,
    formManager,
    handleSubmit,
    disableForm,
  };
};

export default useAddQuestionPage;
