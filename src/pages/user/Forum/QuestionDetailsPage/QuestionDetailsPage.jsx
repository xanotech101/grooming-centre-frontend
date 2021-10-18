import { Box } from "@chakra-ui/layout";
import { Route } from "react-router-dom";

const QuestionDetailsPage = () => {
  return (
    <Box shadow="2px 1px 3px rgba(0, 0, 0, 0.15)" padding={7} margin={2}>
      QuestionDetailsPage
    </Box>
  );
};

export const QuestionDetailsPageRoute = ({ ...rest }) => {
  return (
    <Route {...rest} render={(props) => <QuestionDetailsPage {...props} />} />
  );
};
