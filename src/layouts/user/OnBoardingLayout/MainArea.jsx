import { Flex } from "@chakra-ui/layout";
import { Redirect } from "react-router-dom";
import { Switch } from "react-router-dom";
import { ForgotPasswordPageRoute, SigninPageRoute } from "../../../pages/user";

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
        <ForgotPasswordPageRoute exact path="/auth/forgot-password" />

        <Redirect to="/not-found" />
      </Switch>
    </Flex>
  );
};

export default MainArea;
