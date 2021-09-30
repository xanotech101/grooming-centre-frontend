import { Stack } from "@chakra-ui/layout";
import { useToast } from "@chakra-ui/toast";
import { TvRounded } from "@material-ui/icons";
import { Route } from "react-router-dom";
import { Input, Select, Text } from "../../../../components";
import { useApp } from "../../../../contexts";
import { CreatePageLayout } from "../../../../layouts";
import { adminInviteUser, superAdminInviteAdmin } from "../../../../services";
import useCreateUser from "../hooks/useCreateUser";

const CreateUserPage = ({
  creatorRoleIsSuperAdmin,
  metadata: propMetadata,
}) => {
  const toast = useToast();
  const appManager = useApp();
  const {
    formManager,
    departmentIsRequired,
    handleResetDepartmentIsRequired,
    setStatus,
    // status,
  } = useCreateUser();
  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = formManager;

  const metadata = propMetadata || appManager.state.metadata;

  const onSubmit = async (data) => {
    try {
      const { message } = await (creatorRoleIsSuperAdmin &&
      appManager.getOneMetadata("userRoles", data.roleId)?.name === "admin"
        ? superAdminInviteAdmin(data)
        : adminInviteUser(data));

      setStatus({
        success: message,
      });

      toast({ description: message, position: "top", status: "success" });
      reset();
      handleResetDepartmentIsRequired();
    } catch (err) {
      toast({ description: err.message, position: "top", status: "error" });
    }
  };

  const populateSelectOptions = (data, filterBody = () => true) => {
    return data?.filter(filterBody)?.map((item) => ({
      label: item.name,
      value: item.id,
    }));
  };

  return (
    <CreatePageLayout
      title="Create User"
      submitButtonText="Submit"
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
          options={populateSelectOptions(metadata?.departments)}
          isRequired={departmentIsRequired}
          {...register("departmentId")}
          id="departmentId"
          isLoading={!metadata?.departments}
        />

        <Select
          label="Select Role"
          options={populateSelectOptions(metadata?.userRoles, (userRole) => {
            const userRoleName = appManager.getOneMetadata(
              "userRoles",
              userRole.id
            )?.name;

            if (userRoleName !== "super admin") {
              return true;
            }

            if (!creatorRoleIsSuperAdmin) {
              if (userRoleName !== "admin") {
                return true;
              }
            }
          })}
          isLoading={!metadata?.userRoles}
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
  const { state, getOneMetadata } = useApp();

  const creatorRoleIsSuperAdmin =
    getOneMetadata("userRoles", state.user?.userRoleId)?.name === "super admin";

  return (
    <Route
      {...rest}
      render={(props) => (
        <CreateUserPage
          creatorRoleIsSuperAdmin={creatorRoleIsSuperAdmin}
          {...props}
        />
      )}
    />
  );
};

export default CreateUserPage;
