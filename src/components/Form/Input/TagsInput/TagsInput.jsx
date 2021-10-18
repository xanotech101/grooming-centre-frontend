import { forwardRef } from "react";
import { Input } from "../Input";
import { Box, Tag, TagLabel, TagCloseButton, Flex } from "@chakra-ui/react";
import { useDebounceTyping } from "../../../../hooks";
import { useEffect } from "react";
import { Text } from "../../..";
import useTagsInput from "./hooks/useTagsInput";

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

      {selectedTags.length ? (
        <Flex flexWrap="wrap">
          {selectedTags.map((tag) => (
            <Tag
              key={tag.id}
              variant="solid"
              colorScheme="gray"
              marginRight={2}
              marginTop={2}
            >
              <TagLabel>{tag.label}</TagLabel>
              <TagCloseButton onClick={handleTagDeselect.bind(null, tag)} />
            </Tag>
          ))}
        </Flex>
      ) : null}
    </Box>
  );
});

const TagsResult = ({ results, onTagSelect }) => {
  // ?When this component mount it cause the input to lose fucus
  // Make the input to gain fucus
  useEffect(() => {
    getTagInput().focus();
  }, []);

  const handleEnter = ({ key }, tag) => {
    if (key === "Enter") {
      console.log(tag);
      onTagSelect(tag);
    }
  };

  return (
    <Box
      position="absolute"
      top="38px"
      left={0}
      // height="100px"
      padding={2}
      width="100%"
      backgroundColor="others.1"
      shadow="lg"
      zIndex={2}
    >
      <Text marginBottom={2}>
        Found <b>{results.length}</b> tags
      </Text>

      {results.map((result) => (
        <Tag
          key={result.id}
          variant="solid"
          colorScheme="gray"
          marginRight={1}
          marginTop={1}
          cursor="pointer"
          tabIndex={0}
          onKeyUp={(e) => handleEnter(e, result)}
          onClick={onTagSelect.bind(null, result)}
        >
          <TagLabel>{result.label}</TagLabel>
        </Tag>
      ))}
    </Box>
  );
};
