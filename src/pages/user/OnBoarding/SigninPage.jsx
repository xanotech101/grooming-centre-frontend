import { Flex } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { AiOutlineDown } from "react-icons/ai";
import { Route } from "react-router-dom";
import {
  Brand,
  Button,
  Checkbox,
  Input,
  Link,
  Spinner,
  Text,
} from "../../../components";
import { OnBoardingFormLayout } from "../../../layouts";
import { userSignin } from "../../../services";

const SigninPage = () => {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const { user, token } = await userSignin(data);

      alert(token);
    } catch (error) {
      alert(error.message);
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
