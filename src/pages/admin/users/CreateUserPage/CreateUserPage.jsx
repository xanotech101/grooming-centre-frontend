import { Stack } from "@chakra-ui/layout";
import { useToast } from "@chakra-ui/toast";
import { Route } from "react-router-dom";
import { Input, Select } from "../../../../components";
import { useApp } from "../../../../contexts";
import { CreatePageLayout } from "../../../../layouts";
import { adminInviteUser } from "../../../../services";
import useCreateUser from "../hooks/useCreateUser";

const CreateUserPage = ({ creatorRole }) => {
  const toast = useToast();
  const appManager = useApp();
  const { formManager, departmentIsRequired } = useCreateUser();
  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = formManager;

  const onSubmit = async (data) => {
    try {
      const { message } = await adminInviteUser(data);
      toast({ description: message, position: "top", status: "success" });
      reset();
    } catch (err) {
      toast({ description: err.message, position: "top", status: "error" });
    }
  };

  const populateSelectOptions = (data) => {
    return data?.map((item) => ({
      label: item.name,
      value: item.id,
    }));
  };

  return (
    <CreatePageLayout
      title="Create User"
      submitButtonText="Add User"
      submitButtonIsLoading={isSubmitting}
      onSubmit={handleSubmit(onSubmit)}
    >
      <Stack spacing={10} marginBottom={10} maxWidth="386px">
        {/* <Grid templateColumns="repeat(2, 1fr)" gap={10} marginBottom={10}> */}
        <Input
          label="User's email"
          isRequired
          {...register("email")}
          id="email"
        />
        <Select
          label="Department"
          options={populateSelectOptions(
            appManager.state.metadata?.departments
          )}
          isRequired={departmentIsRequired}
          {...register("departmentId")}
          id="departmentId"
          isLoading={!appManager.state.metadata?.departments}
        />

        <Select
          label="Select Role"
          options={populateSelectOptions(appManager.state.metadata?.userRoles)}
          isLoading={!appManager.state.metadata?.userRoles}
          isRequired
          {...register("roleId")}
          id="roleId"
        />
        {/* </Grid> */}
      </Stack>
    </CreatePageLayout>
  );
};

export const CreateUserPageRoute = ({ component: Component, ...rest }) => {
  return <Route {...rest} render={(props) => <CreateUserPage {...props} />} />;
};

export default CreateUserPage;
