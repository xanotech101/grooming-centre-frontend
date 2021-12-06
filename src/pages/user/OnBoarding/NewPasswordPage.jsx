import { useToast } from "@chakra-ui/toast";
import { useForm } from "react-hook-form";
import { Route } from "react-router-dom";
import { Button, Heading, PasswordInput } from "../../../components";
import { OnBoardingFormLayout } from "../../../layouts";
import { userCreateNewPassword, userResetPassword } from "../../../services";
import { useApp } from "../../../contexts";
import useQueryParams from "../../../hooks/useQueryParams";
import { capitalizeFirstLetter } from "../../../utils/formatString";
import {
  useRedirectNonAuthUserToSigninPage,
  usePageRefreshAfterLogin,
} from "../../../hooks";

const NewPasswordPage = () => {
  usePageRefreshAfterLogin();
  useRedirectNonAuthUserToSigninPage();

  const toast = useToast();
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors, isSubmitting },
    reset,
  } = useForm();
  const values = getValues();

  const { handleLogout } = useApp();
  const queryParams = useQueryParams();

  const resetToken = queryParams.get("resetToken");

  const onSubmit = async (data) => {
    const handleRequest = (body) =>
      resetToken ? userResetPassword(body) : userCreateNewPassword(body);

    try {
      if (data.password !== data.confirmPassword) {
        throw new Error("Passwords must match");
      }

      const body = { password: data.password };

      const { message } = await handleRequest(body);
      toast({
        description: capitalizeFirstLetter(message),
        position: "top",
        status: "success",
      });
      handleLogout();
      reset();
    } catch (err) {
      toast({
        description: capitalizeFirstLetter(err.message),
        position: "top",
        status: "error",
      });
    }
  };

  return (
    <OnBoardingFormLayout
      renderHeader={() => (
        <Heading as="h1" fontSize="heading.h4">
          Kindly update your password
        </Heading>
      )}
      onSubmit={handleSubmit(onSubmit)}
      renderInputs={() => (
        <>
          <PasswordInput
            id="new-password"
            label="New password"
            error={errors.password?.message}
            {...register("password", {
              required: {
                value: true,
                message: "Password can't be empty",
              },
              minLength: {
                value: 3,
                message: "Password should not be less than 3 characters",
              },
            })}
          />
          <PasswordInput
            id="confirmPassword"
            label="Confirm password"
            error={errors.confirmPassword?.message}
            {...register("confirmPassword", {
              required: "Confirm password can't be empty",
              validate: (value) =>
                value === values.password || "Password must match",
            })}
          />
        </>
      )}
      renderSubmit={(props) => (
        <Button {...props} isLoading={isSubmitting}>
          {resetToken ? "Reset password" : "Create new password"}
        </Button>
      )}
    />
  );
};

export const NewPasswordPageRoute = ({ ...rest }) => {
  return <Route {...rest} render={(props) => <NewPasswordPage {...props} />} />;
};
