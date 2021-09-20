import { Flex } from "@chakra-ui/react";
import { useToast } from "@chakra-ui/toast";
import { useForm } from "react-hook-form";
import { Route } from "react-router-dom";
import {
  Brand,
  Button,
  Checkbox,
  Input,
  Link,
  Text,
} from "../../../components";
import { OnBoardingFormLayout } from "../../../layouts";
import { userSignin } from "../../../services";

const SigninPage = () => {
  const toast = useToast();
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const { user, token, message } = await userSignin(data);
      toast({ description: message, position: "top", status: "success" });
      localStorage.setItem("token", token);
      reset();
    } catch (error) {
      const { message } = error.response?.data;

      toast({ description: message, position: "top", status: "error" });
    }
  };

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
            id="email"
            type="email"
            label="Email"
            isRequired
            {...register("email")}
          />
          <Input
            id="password"
            type="password"
            label="Password"
            isRequired
            {...register("password")}
          />
        </>
      )}
      onSubmit={handleSubmit(onSubmit)}
      renderSubmit={(props) => (
        <Button
          {...props}
          isLoading={isSubmitting}
          disabled={isSubmitting}
          loadingText="Sign in"
        >
          Sign in
        </Button>
      )}
      renderFooter={() => (
        <Flex justifyContent="space-between">
          <Checkbox label="Remember me" />

          <Link href="/auth/forgot-password">
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
