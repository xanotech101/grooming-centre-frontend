import { useToast } from "@chakra-ui/toast";
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
import { capitalizeFirstLetter } from "../../../../utils";
import { userForumCreateTag } from "../../../../services";
import useAddQuestionPage from "./hooks/useAddQuestionPage";

const AddQuestionPage = () => {
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

  const [isCreatingTag, setIsCreatingTag] = useState(false);
  const toast = useToast();

  /**
   * This event handler let the user Add an unknown `tag` by hitting enter key while typing
   * @param {ChangeEvent<HTMLInputElement>} event
   */
  const handleTagInputEnterKeyPress = async ({ key }) => {
    if (key === "Enter") {
      try {
        setIsCreatingTag(true);

        const { tag } = await userForumCreateTag({ title: typedTagValue });

        handleTagSelectMany(tag);
        getTagInput().value = "";
        getTagInput().focus();
      } catch (err) {
        toast({
          description: capitalizeFirstLetter(err.message),
          position: "top",
          status: "error",
        });
      } finally {
        setIsCreatingTag(false);
      }
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
          onKeyUp={handleTagInputEnterKeyPress}
          isCreatingTag={isCreatingTag}
          selectedTags={selectedTags}
          onChange={handleTagType}
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
