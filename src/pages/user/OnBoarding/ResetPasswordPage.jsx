import { useToast } from "@chakra-ui/toast";
import { Flex } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { Route } from "react-router-dom";
import { Brand, Button, Input } from "../../../components";
import { OnBoardingFormLayout } from "../../../layouts";
import { userResetPassword } from "../../../services";
import { useApp } from "../../../contexts";
import { useHistory } from "react-router-dom";
import { capitalizeFirstLetter } from "../../../utils/formatString";

const ResetPasswordPage = () => {
  const toast = useToast();
  const {
    register,
    handleSubmit,
    getValues,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();
  const values = getValues();

  const { handleLogout } = useApp();
  const { replace } = useHistory();

  const onSubmit = async (data) => {
    try {
      const body = { password: data.password };

      const { message } = await userResetPassword(body);
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
          <Input
            id="confirmPassword"
            type="password"
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
          Reset password
        </Button>
      )}
    />
  );
};

export const ResetPasswordPageRoute = ({ ...rest }) => {
  return (
    <Route {...rest} render={(props) => <ResetPasswordPage {...props} />} />
  );
};
