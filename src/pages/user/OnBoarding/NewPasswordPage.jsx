import { useToast } from "@chakra-ui/toast";
import { Flex } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { Route } from "react-router-dom";
import { Brand, Button, Input, Text } from "../../../components";
import { OnBoardingFormLayout } from "../../../layouts";
import { userCreateNewPassword, userResetPassword } from "../../../services";
import { useApp } from "../../../contexts";
import { useHistory } from "react-router-dom";
import useQueryParams from "../../../hooks/useQueryParams";
import { capitalizeFirstLetter } from "../../../utils/formatString";

const NewPasswordPage = () => {
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
  const { replace } = useHistory();
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

      replace("/auth/signin");
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
        <Flex justifyContent="center" textAlign="left">
          <Brand />
        </Flex>
      )}
      onSubmit={handleSubmit(onSubmit)}
      renderInputs={() => (
        <>
          <Input
            id="new-password"
            type="password"
            label="New password"
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
          {errors.password ? (
            <Text color="secondary.5" style={{ marginTop: 0 }}>
              {errors.password.message}
            </Text>
          ) : null}
          <Input
            id="confirmPassword"
            type="password"
            label="Confirm password"
            {...register("confirmPassword", {
              required: "Confirm password can't be empty",
              validate: (value) => value === values.password || "Password must match",
            })}
          />
          {errors.confirmPassword ? (
            <Text color="secondary.5" style={{ marginTop: 0 }}>
              {errors.confirmPassword.message}
            </Text>
          ) : null}
        </>
      )}
      renderSubmit={(props) => (
        <Button {...props} isLoading={isSubmitting}>
          {resetToken ? "Reset password" : "Create new password"}
        </Button>
      )}
    />
  );
};;

export const NewPasswordPageRoute = ({ ...rest }) => {
  return <Route {...rest} render={(props) => <NewPasswordPage {...props} />} />;
};
