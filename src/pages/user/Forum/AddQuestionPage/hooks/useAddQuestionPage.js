import { useToast } from "@chakra-ui/toast";
import { useCallback } from "react";
import { useEffect } from "react";
import { useFetchAndCache } from "../../../../../hooks";
import { userForumGetCategories } from "../../../../../services";
import { capitalizeFirstLetter } from "../../../../../utils/formatString";

/**
 * Manages AddQuestionPage state
 *
 * @returns {{ categories: { data: ?Array<{ value: string, label: string }>, loading: boolean, err: ?string }}}
 */
const useAddQuestionPage = () => {
  const toast = useToast();
  const { resource: categories, handleFetchResource } = useFetchAndCache();

  const fetcher = useCallback(async () => {
    const { categories } = await userForumGetCategories();
    return categories;
  }, []);

  useEffect(() => {
    handleFetchResource({ cacheKey: "forum-categories", fetcher });
  }, [handleFetchResource, fetcher]);

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

  return {
    categories,
  };
};

export default useAddQuestionPage;
