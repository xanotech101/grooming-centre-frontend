import { Grid, Stack } from "@chakra-ui/layout";
import { useToast } from "@chakra-ui/toast";
import { Route } from "react-router-dom";
import { Input, Select, Breadcrumb, Link } from "../../../../components";
import { useApp } from "../../../../contexts";
import { CreatePageLayout } from "../../../../layouts";
import { adminInviteUser, superAdminInviteAdmin } from "../../../../services";
import { capitalizeFirstLetter } from "../../../../utils/formatString";
import useCreateUser from "../hooks/useCreateUser";
import { BreadcrumbItem, Box } from "@chakra-ui/react";
import { populateSelectOptions } from "../../../../utils";

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
    formState: { errors, isSubmitting },
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

      toast({
        description: capitalizeFirstLetter(message),
        position: "top",
        status: "success",
      });
      reset();
      handleResetDepartmentIsRequired();
    } catch (err) {
      toast({
        description: capitalizeFirstLetter(err.message),
        position: "top",
        status: "error",
      });
    }
  };

  return (
    <>
      <Box paddingLeft={6}>
        <Breadcrumb
          item2={
            <BreadcrumbItem>
              <Link href="/admin/users">Users</Link>
            </BreadcrumbItem>
          }
          item3={
            <BreadcrumbItem isCurrentPage>
              <Link href="#">Create Users</Link>
            </BreadcrumbItem>
          }
        />
      </Box>
      <CreatePageLayout
        title="Create User"
        submitButtonText="Submit"
        submitButtonIsLoading={isSubmitting}
        onSubmit={handleSubmit(onSubmit)}
      >
        <Stack spacing={10} marginBottom={10}>
          <Grid templateColumns="repeat(2, 1fr)" gap={10} marginBottom={10}>
          <Input
            label="Firstname"
            id="firstname"
            isRequired
            {...register("firstname", {
              required: "Firstname is required",
            })}
            error={errors.firstname?.message}
          />
          <Input
            label="Lastname"
            id="lastname"
            isRequired
            {...register("lastname", {
              required: "Lastname is required",
            })}
            error={errors.lastname?.message}
          />
          <Input
            label="User's email"
            id="email"
            isRequired
            {...register("email", {
              required: "Email can't be empty",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                message: "Enter a valid e-mail address",
              },
            })}
            error={errors.email?.message}
          />
          <Select
            label="Department"
            options={populateSelectOptions(metadata?.departments)}
            id="departmentId"
            isLoading={!metadata?.departments}
            isRequired={departmentIsRequired}
            {...register("departmentId", {
              required: departmentIsRequired && "Please select a department",
            })}
            error={errors.departmentId?.message}
          />
          <Select
            label="Select Role"
            options={populateSelectOptions(metadata?.userRoles, (r) => {
              const role = appManager.getOneMetadata("userRoles", r.id)?.name;

              if (role !== "super admin") {
                return true;
              }

              if (!creatorRoleIsSuperAdmin && role !== "admin") {
                return true;
              }
            })}
            isLoading={!metadata?.userRoles}
            isRequired
            {...register("roleId", {
              required: "Please select a role",
            })}
            id="roleId"
            error={errors.roleId?.message}
          />
          </Grid>
        </Stack>
      </CreatePageLayout>
    </>
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
