import { HStack } from "@chakra-ui/react";
import { Route } from "react-router-dom";
import { Button, Heading, Input, Link, Text } from "../../../components";
import { OnBoardingFormLayout } from "../../../layouts";

const ForgotPasswordPage = () => {
  return (
    <OnBoardingFormLayout
      renderHeader={() => <Heading as="h2">Forgot password</Heading>}
      renderInputs={() => (
        <Input id="email" type="email" label="Email" isRequired />
      )}
      renderSubmit={(props) => <Button {...props}>Reset Password</Button>}
      renderBody={() => (
        <Text as="level1" width="500px">
          A password reset link has been sent to your email,
          <br />
          Please follow the instructions in the email.
        </Text>
      )}
      renderFooter={() => (
        <HStack spacing={1} justifyContent="center">
          <Text>Back to</Text>

          <Link href="/auth/signin">
            <Text color="primary.base">Sign in</Text>
          </Link>
        </HStack>
      )}
    />
  );
};

export const ForgotPasswordPageRoute = ({ ...rest }) => {
  return (
    <Route {...rest} render={(props) => <ForgotPasswordPage {...props} />} />
  );
};
