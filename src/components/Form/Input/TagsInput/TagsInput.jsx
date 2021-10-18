import { forwardRef } from "react";
import { Input } from "../Input";
import { Box } from "@chakra-ui/react";
import { useDebounceTyping } from "../../../../hooks";
import { useEffect } from "react";
import useTagsInput from "./hooks/useTagsInput";
import { SelectedTags } from "./SelectedTags";
import TagsResult from "./TagsResult";

const getTagInput = () => {
  const tagsInput = document.querySelector("#tags");
  return tagsInput;
};

export const TagsInput = forwardRef((props, ref) => {
  const debounce = useDebounceTyping();
  const { selectedTags, handleTagSearch, tagsResult, handleClearResource } =
    useTagsInput(props);

  const handleTagType = (e) => {
    handleClearResource();
    debounce.handleType(e, handleTagSearch);
    props.onChange(e);
  };

  const handleTagSelect = (tag) => {
    props.onTagSelect(tag);
    handleClearResource();
    getTagInput().value = "";
    getTagInput().focus();
  };

  const inputTagInput = getTagInput();

  useEffect(() => {
    if (!inputTagInput?.value) {
      handleClearResource();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inputTagInput?.value]);

  const handleTagDeselect = (tag) => {
    props.onTagDeselect(tag);
  };

  return (
    <Box position="relative">
      <Input
        ref={ref}
        {...props}
        onChange={handleTagType}
        isLoading={tagsResult.loading}
      />

      {tagsResult.data && (
        <TagsResult results={tagsResult.data} onTagSelect={handleTagSelect} />
      )}

      <SelectedTags tags={selectedTags} onTagDeselect={handleTagDeselect} />
    </Box>
  );
});
