import { Box, Stack } from "@chakra-ui/layout";
import { Route } from "react-router-dom";
import { Button, Input, Select, Textarea } from "../../../../components";
import useAddQuestionPage from "./hooks/useAddQuestionPage";

const AddQuestionPage = () => {
  const { categories } = useAddQuestionPage();

  return (
    <Box shadow="2px 1px 3px rgba(0, 0, 0, 0.15)" padding={7} margin={2}>
      <Stack spacing={5} as="form">
        <Select
          placeholder="Choose categories"
          options={categories.data}
          isLoading={categories.loading}
        />
        <Input placeholder="Type catching attention title" />
        <Textarea placeholder="Type your question" minHeight="150px" />
        <Input placeholder="Choose up to three tags" />

        <Box textAlign="right">
          <Button type="submit">Publish</Button>
        </Box>
      </Stack>
    </Box>
  );
};

export const AddQuestionPageRoute = ({ ...rest }) => {
  return <Route {...rest} render={(props) => <AddQuestionPage {...props} />} />;
};
