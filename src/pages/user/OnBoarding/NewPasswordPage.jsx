import { useToast } from "@chakra-ui/toast";
import { Flex } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { Route } from "react-router-dom";
import { Brand, Button, Input } from "../../../components";
import { OnBoardingFormLayout } from "../../../layouts";
import { userCreateNewPassword } from "../../../services";
import { useApp } from "../../../contexts";
import { useHistory } from "react-router-dom";
import useQueryParams from "../../../hooks/useQueryParams";

const NewPasswordPage = () => {
  const queryParams = useQueryParams();

  console.log(queryParams);

  const toast = useToast();
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
    reset,
  } = useForm();
  const { handleLogout } = useApp();
  const { replace } = useHistory();

  const onSubmit = async (data) => {
    try {
      if (data.password !== data.retypePassword) {
        throw new Error("Passwords must match");
      }

      const { message } = await userCreateNewPassword({
        password: data.password,
      });
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
            id="retypePassword"
            type="password"
            label="Retype password"
            isRequired
            {...register("retypePassword")}
          />
        </>
      )}
      renderSubmit={(props) => (
        <Button {...props} isLoading={isSubmitting}>
          Create new password
        </Button>
      )}
    />
  );
};

export const NewPasswordPageRoute = ({ ...rest }) => {
  return <Route {...rest} render={(props) => <NewPasswordPage {...props} />} />;
};
