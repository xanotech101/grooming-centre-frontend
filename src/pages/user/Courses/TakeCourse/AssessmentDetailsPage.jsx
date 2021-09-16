import { Box } from "@chakra-ui/react";
import { Route } from "react-router-dom";
import { Heading } from "../../../../components";

const AssessmentDetailsPage = () => {
  return (
    <Box>
      <Box as="header">
        <Heading as="h1" fontSize="heading.h3">
          Assessment
        </Heading>
      </Box>
    </Box>
  );
};

export const AssessmentDetailsPageRoute = ({ ...rest }) => {
  return (
    <Route {...rest} render={(props) => <AssessmentDetailsPage {...props} />} />
  );
};
