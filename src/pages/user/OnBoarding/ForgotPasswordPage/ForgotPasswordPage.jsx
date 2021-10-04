import { useToast } from "@chakra-ui/toast";
import { HStack } from "@chakra-ui/react";
import { Route } from "react-router-dom";
import { Button, Heading, Input, Link, Text } from "../../../../components";
import { OnBoardingFormLayout } from "../../../../layouts";
import { useForm } from "react-hook-form";
import { userForgetPassword } from "../../../../services";
import { useState } from "react";
import { capitalizeFirstLetter } from "../../../../utils/formatString";

const ForgotPasswordPage = () => {
  const toast = useToast();
  const [status, setStatus] = useState({ success: false, err: false });

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, hasSubmitted },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      await userForgetPassword(data);

      setStatus({ success: true });
    } catch (err) {
      setStatus({ err: true });
      toast({
        description: capitalizeFirstLetter(err.message),
        position: "top",
        status: "error",
      });
    }
  };

  console.log(hasSubmitted, isSubmitting);

  return (
    <OnBoardingFormLayout
      onSubmit={handleSubmit(onSubmit)}
      renderHeader={() => <Heading as="h2">Forgot password</Heading>}
      renderInputs={() => (
        <Input
          id="email"
          type="email"
          label="Email"
          isRequired
          {...register("email")}
        />
      )}
      renderSubmit={(props) => (
        <Button isLoading={isSubmitting} {...props}>
          Reset Password
        </Button>
      )}
      renderBody={
        status.success
          ? () => (
              <Text as="level1" width="500px">
                A password reset link has been sent to your email,
                <br />
                Please follow the instructions in the email.
              </Text>
            )
          : null
      }
      renderFooter={() => (
        <HStack spacing={1} justifyContent="center">
          {!status.success && <Text>Back to</Text>}

          <Link href="/auth/signin">
            {status.success ? (
              <Button>Back to Sign in</Button>
            ) : (
              <Text color="primary.base">Sign in</Text>
            )}
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

export default ForgotPasswordPage;
