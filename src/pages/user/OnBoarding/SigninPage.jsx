import { Box, Flex, Heading, Skeleton } from "@chakra-ui/react";
import { Route } from "react-router-dom";
import { Brand } from "../../../components";

const SigninPage = () => {
  return (
    <Box height="150px">
      <Brand />
    </Box>
  );
};

export const SigninPageRoute = ({ ...rest }) => {
  return <Route {...rest} render={(props) => <SigninPage {...props} />} />;
};
