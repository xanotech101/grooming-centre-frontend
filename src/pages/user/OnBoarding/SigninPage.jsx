import { Box, Flex, Heading, Skeleton } from "@chakra-ui/react";
import { Route } from "react-router-dom";

const SigninPage = () => {
  return (
    <Box>
      <Flex height="150px">
        <Skeleton boxSize="50px" marginRight={2}></Skeleton>

        <Box
          width="100px"
          borderLeft="1px"
          paddingLeft={2}
          alignSelf="flex-start"
        >
          <Heading size="lg" lineHeight="25px">
            UNKNOWN
          </Heading>
        </Box>
      </Flex>
    </Box>
  );
};

export const SigninPageRoute = ({ ...rest }) => {
  return <Route {...rest} render={(props) => <SigninPage {...props} />} />;
};
