import { Grid } from "@chakra-ui/layout";
import { useToast } from "@chakra-ui/toast";
import { Route } from "react-router-dom";
import { Input, Select } from "../../../components";
import { CreatePageLayout } from "../../../layouts";
import { adminInviteUser } from "../../../services";
import useCreateUser from "./hooks/useCreateUser";

const CreateUserPage = () => {
  const toast = useToast();
  const { formManager, departmentIsRequired } = useCreateUser();
  const { register, handleSubmit } = formManager;

  const onSubmit = async (data) => {
    console.log(data);

    try {
      const { message } = await adminInviteUser({});

      alert(message);
    } catch (error) {
      toast({ description: error.message });
    }
  };

  return (
    <CreatePageLayout
      title="Create User"
      submitButtonText="Add User"
      onSubmit={handleSubmit(onSubmit)}
    >
      {/* <Stack spacing={10} marginBottom={10} maxWidth="386px"> */}
      <Grid templateColumns="repeat(2, 1fr)" gap={10} marginBottom={10}>
        <Input
          label="User's first name"
          isRequired
          {...register("firstName")}
          id="firstName"
        />
        <Input
          label="User's last name"
          isRequired
          {...register("lastName")}
          id="lastName"
        />
        <Input
          label="User's email"
          isRequired
          {...register("email")}
          id="email"
        />
        <Input
          label="User's phone number"
          isRequired
          {...register("phone")}
          id="phone"
        />

        <Select
          label="Department"
          options={[
            { label: "Dept 1", value: "Dept-1" },
            { label: "Dept 2", value: "Dept-2" },
            { label: "Dept 3", value: "Dept-3" },
          ]}
          isRequired={departmentIsRequired}
          {...register("departmentId")}
          id="departmentId"
        />

        <Select
          label="Select Role"
          options={[
            { label: "Role 1", value: "Role-1" },
            { label: "Role 2", value: "Role-2" },
            { label: "Role 3", value: "Role-3" },
          ]}
          isRequired
          {...register("role")}
          id="role"
        />
      </Grid>
      {/* </Stack> */}
    </CreatePageLayout>
  );
};

export const CreateUserPageRoute = ({ component: Component, ...rest }) => {
  return <Route {...rest} render={(props) => <CreateUserPage {...props} />} />;
};
