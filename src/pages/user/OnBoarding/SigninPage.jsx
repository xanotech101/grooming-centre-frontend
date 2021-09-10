import { Flex, Checkbox } from "@chakra-ui/react";
import { Route } from "react-router-dom";
import { Brand, Button, Input, Link, Text } from "../../../components";
import { OnBoardingFormLayout } from "../../../layouts";

const SigninPage = () => {
  return (
    <OnBoardingFormLayout
      renderHeader={() => (
        <Flex justifyContent="center" textAlign="left">
          <Brand />
        </Flex>
      )}
      renderInputs={() => (
        <>
          <Input id="email" label="Email" isRequired />
          <Input id="password" label="Password" isRequired />
        </>
      )}
      renderSubmit={() => <Button>Sign in</Button>}
      renderFooter={() => (
        <Flex justifyContent="space-between">
          <Link>
            <Text color="primary.base">Forgot Password?</Text>
          </Link>
        </Flex>
      )}
    />
  );
};

export const SigninPageRoute = ({ ...rest }) => {
  return <Route {...rest} render={(props) => <SigninPage {...props} />} />;
};
