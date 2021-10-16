import { useToast } from "@chakra-ui/toast";
import { useEffect } from "react";
import { useFetch } from "../../../../../hooks";
import { userForumGetTags } from "../../../../../services";
import { capitalizeFirstLetter } from "../../../../../utils";

const useTagsInput = (props) => {
  const { selectedTags } = props;
  const toast = useToast();

  const {
    resource: tagsResult,
    handleFetchResource,
    handleClearResource,
  } = useFetch();

  const fetcher = (value) => async () => {
    console.log("searching...", value);

    const { tags } = await userForumGetTags();
    return tags;
  };

  const handleTagSearch = async (event) => {
    const { value } = event.target;

    if (value) {
      handleFetchResource({ fetcher: fetcher(value) });
    } else {
      handleClearResource();
    }
  };

  // Handle Tag search error
  useEffect(() => {
    if (tagsResult.err) {
      toast({
        description: capitalizeFirstLetter(tagsResult.err),
        position: "top",
        status: "error",
      });
    }
  }, [tagsResult.err, toast]);

  return { selectedTags, handleTagSearch, tagsResult, handleClearResource };
};

export default useTagsInput;
