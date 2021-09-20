import { Flex } from "@chakra-ui/react";
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

const SigninPage = () => {
  const { register, handleSubmit } = useForm();

  const onSubmit = async (data) => {
    console.log(data);
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
      renderSubmit={(props) => <Button {...props}>Sign in</Button>}
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
