import { Box, Stack } from "@chakra-ui/layout";
import { useState } from "react";
import { Route } from "react-router-dom";
import {
  Button,
  Input,
  Select,
  TagsInput,
  Textarea,
} from "../../../../components";
import { getTagInput } from "../../../../components/Form/Input/TagsInput/hooks/useTagsInput";
import { useSelectedTags } from "../../../../hooks";
import useAddQuestionPage from "./hooks/useAddQuestionPage";
import { v4 as uuid } from "uuid";
import { useApp } from "../../../../contexts";

const AddQuestionPage = () => {
  const {
    state: { user },
  } = useApp();

  const {
    selectedTags,
    handleTagSelectMany,
    handleTagDeselect,
    handleClearAllSelectedTags,
  } = useSelectedTags();

  const { categories, formManager, handleSubmit, disableForm } =
    useAddQuestionPage({
      selectedTags,
      handleClearAllSelectedTags,
    });

  const questionInputMinChars = 10;
  const questionInputMaxChars = 250;

  const [typedTagValue, setTypedTagValue] = useState("");

  const handleTagInputEnterKeyPress = ({ key }) => {
    if (key === "Enter") {
      const tag = { id: `no-id--${uuid()}`, label: typedTagValue };

      handleTagSelectMany(tag);
      getTagInput().value = "";
      getTagInput().focus();
    }
  };

  const handleTagType = ({ target: { value } }) => {
    setTypedTagValue(value);
  };

  function handleStopSubmissionWithEnterKey(e) {
    var node = e.target ? e.target : e.srcElement ? e.srcElement : null;
    if (node.type === "textarea") return true;

    var keyCode = e.keyCode || e.which;
    if (keyCode === 13) {
      e.preventDefault();

      // Allow `textarea` to use Enter key
      return false;
    }
  }

  return (
    <Box shadow="2px 1px 3px rgba(0, 0, 0, 0.15)" padding={7} margin={2}>
      <Stack
        spacing={6}
        as="form"
        onSubmit={handleSubmit()}
        onKeyPress={handleStopSubmissionWithEnterKey}
      >
        <Select
          id="categoryId"
          placeholder="Choose categories"
          options={categories.data}
          isLoading={categories.loading}
          isRequired
          error={formManager.formState.errors.categoryId?.message}
          {...formManager.register("categoryId", {
            required: "Please choose a category",
          })}
        />
        <Input
          id="title"
          placeholder="Type catching attention title"
          error={formManager.formState.errors.title?.message}
          {...formManager.register("title", {
            required: "Title cannot be empty",
          })}
        />
        <Textarea
          id="question"
          placeholder="Type your question"
          minHeight="150px"
          error={formManager.formState.errors.question?.message}
          {...formManager.register("question", {
            required: "You have to ask a question",
            minLength: {
              value: questionInputMinChars,
              message: "Please a valid question",
            },
            maxLength: {
              value: questionInputMaxChars,
              message: `Question cannot be greater than ${questionInputMaxChars} characters`,
            },
          })}
        />

        <TagsInput
          id="tags"
          placeholder="Choose up to three tags"
          selectedTags={selectedTags}
          onChange={handleTagType}
          onKeyUp={handleTagInputEnterKeyPress}
          onTagSelect={handleTagSelectMany}
          onTagDeselect={handleTagDeselect}
        />

        <Box textAlign="right" paddingTop={2}>
          <Button type="submit" disabled={disableForm} isLoading={disableForm}>
            Publish
          </Button>
        </Box>
      </Stack>
    </Box>
  );
};

export const AddQuestionPageRoute = ({ ...rest }) => {
  return <Route {...rest} render={(props) => <AddQuestionPage {...props} />} />;
};
