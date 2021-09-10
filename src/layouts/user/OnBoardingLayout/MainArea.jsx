import { Flex } from "@chakra-ui/layout";

import { Redirect } from "react-router-dom";
import { Route } from "react-router-dom";
import { Switch } from "react-router-dom";
import { SigninPageRoute } from "../../../pages/user";

const MainArea = () => {
  return (
    <Flex
      as="main"
      minWidth={{ base: "500px", xl: "700px" }}
      alignItems="center"
      justifyContent="center"
    >
      <Switch>
        <SigninPageRoute exact path="/auth/signin" />
        <Route
          exact
          path="/auth/signup"
          render={(props) => <div {...props}>Signup</div>}
        />
        <Redirect to="/not-found" />
      </Switch>
    </Flex>
  );
};

export default MainArea;
