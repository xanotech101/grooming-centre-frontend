import { useToast } from "@chakra-ui/toast";
import { Flex } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { Route } from "react-router-dom";
import { Brand, Button, Input } from "../../../components";
import { OnBoardingFormLayout } from "../../../layouts";
import { userCreateNewPassword, userResetPassword } from "../../../services";
import { useApp } from "../../../contexts";
import { useHistory } from "react-router-dom";
import useQueryParams from "../../../hooks/useQueryParams";

const NewPasswordPage = () => {
  const toast = useToast();
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
    reset,
  } = useForm();
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
      toast({ description: message, position: "top", status: "success" });
      handleLogout();
      reset();

      replace("/auth/signin");
    } catch (err) {
      toast({ description: err.message, position: "top", status: "error" });
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
            isRequired
            {...register("password")}
          />
          <Input
            id="confirmPassword"
            type="password"
            label="Confirm password"
            isRequired
            {...register("confirmPassword")}
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
