import { Flex } from "@chakra-ui/react";
import { Route } from "react-router-dom";
import { Brand, Button, Input } from "../../../components";
import { OnBoardingFormLayout } from "../../../layouts";

const NewPasswordPage = () => {
  return (
    <OnBoardingFormLayout
      renderHeader={() => (
        <Flex justifyContent="center" textAlign="left">
          <Brand />
        </Flex>
      )}
      renderInputs={() => (
        <>
          <Input
            id="new-password"
            type="password"
            label="New password"
            isRequired
          />
          <Input
            id="retype-password"
            type="password"
            label="Retype password"
            isRequired
          />
        </>
      )}
      renderSubmit={(props) => <Button {...props}>Sign in</Button>}
    />
  );
};

export const NewPasswordPageRoute = ({ ...rest }) => {
  return <Route {...rest} render={(props) => <NewPasswordPage {...props} />} />;
};
