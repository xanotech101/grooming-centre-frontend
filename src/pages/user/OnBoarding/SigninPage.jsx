import { Flex } from "@chakra-ui/react";
import { useToast } from "@chakra-ui/toast";
import { useEffect, useState } from "react";
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
import { useApp } from "../../../contexts";
import { useAuthCheckRedirect } from "../../../hooks/useAuthCheckRedirect";
import { OnBoardingFormLayout } from "../../../layouts";
import { userSignin } from "../../../services";
import { capitalizeFirstLetter } from "../../../utils/formatString";

const SigninPage = () => {
  const toast = useToast();
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
    reset,
  } = useForm();
  const appManager = useApp();
  const { handleLogout } = appManager;

  const [checkAuth, setCheckAuth] = useState(false);

  const onSubmit = async (data) => {
    try {
      const { user, token } = await userSignin(data);

      // toast({ description: capitalizeFirstLetter(message), position: "top", status: "success" });

      appManager.handleSetToken(token);
      appManager.handleSetCurrentUser(user);

      if (user.isInviteActive) {
        window.location.replace("/auth/new-password");
      } else {
        setCheckAuth(true);
      }

      reset();
    } catch (err) {
      toast({
        description: capitalizeFirstLetter(err.message),
        position: "top",
        status: "error",
      });
    }
  };

  // TODO: remove or keep based on business
  useEffect(() => {
    handleLogout();
  }, [handleLogout]);

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
          {checkAuth && <AuthCheck />}
        </>
      )}
      onSubmit={handleSubmit(onSubmit)}
      renderSubmit={(props) => (
        <Button
          {...props}
          isLoading={isSubmitting || checkAuth}
          // disabled={isSubmitting}
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

const AuthCheck = () => {
  useAuthCheckRedirect(1000);

  return null;
};

export const SigninPageRoute = ({ ...rest }) => {
  return <Route {...rest} render={(props) => <SigninPage {...props} />} />;
};
