import { Box, Stack } from "@chakra-ui/layout";
import { Route } from "react-router-dom";
import { Button, Input, Select, Textarea } from "../../../../components";
import useAddQuestionPage from "./hooks/useAddQuestionPage";

const AddQuestionPage = () => {
  const { categories, formManager, handleSubmit } = useAddQuestionPage();

  const questionInputMinChars = 10;
  const questionInputMaxChars = 250;

  return (
    <Box shadow="2px 1px 3px rgba(0, 0, 0, 0.15)" padding={7} margin={2}>
      <Stack spacing={6} as="form" onSubmit={handleSubmit()}>
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

        <Input id="tags" placeholder="Choose up to three tags" />

        <Box textAlign="right" paddingTop={2}>
          <Button type="submit">Publish</Button>
        </Box>
      </Stack>
    </Box>
  );
};

export const AddQuestionPageRoute = ({ ...rest }) => {
  return <Route {...rest} render={(props) => <AddQuestionPage {...props} />} />;
};
