import { Box } from "@chakra-ui/react";
import { Route } from "react-router-dom";
import { Heading } from "../../../../components";

const LessonDetailsPage = () => {
  return (
    <Box>
      <Box as="header">
        <Heading as="h1" fontSize="heading.h3">
          {"<Lesson Title>"}
        </Heading>
      </Box>
    </Box>
  );
};

export const LessonDetailsPageRoute = ({ ...rest }) => {
  return (
    <Route {...rest} render={(props) => <LessonDetailsPage {...props} />} />
  );
};
