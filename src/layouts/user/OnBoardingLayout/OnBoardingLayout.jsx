import { Box, Flex } from "@chakra-ui/layout";
import { Redirect } from "react-router-dom";
import { Route, Switch } from "react-router-dom";

const OnBoardingLayout = () => {
  return (
    <Flex>
      <Box as="main">
        <Switch>
          <Route
            exact
            path="/auth/signin"
            render={(props) => <div {...props}>Signin</div>}
          />
          <Route
            exact
            path="/auth/signup"
            render={(props) => <div {...props}>Signup</div>}
          />
          <Redirect to="/not-found" />
        </Switch>
      </Box>

      <Box>hero</Box>
    </Flex>
  );
};

export const OnBoardingLayoutRoute = ({ ...rest }) => {
  return (
    <Route {...rest} render={(props) => <OnBoardingLayout {...props} />} />
  );
};
