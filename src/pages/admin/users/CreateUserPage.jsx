import { Stack } from "@chakra-ui/layout";

import { Route } from "react-router-dom";
import { adminInviteUser } from "../../../services";
import { Input, Select } from "../../../components";
import { CreatePageLayout } from "../../../layouts";
import { useForm } from "react-hook-form";

const CreateUserPage = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  // const formData = {
  //   email: "testing-form2@gmail.com",
  //   firstName: "John User",
  //   lastName: "sam User",
  //   phone: "08100003485",
  //   departmentId: "58774414-a9b5-4d24-9866-bef771446586",
  // };

  console.log(watch("email"));

  const onSubmit = async (data) => {
    console.log(data);

    // try {
    //   const { message } = await adminInviteUser({});

    //   alert(message);
    // } catch (error) {
    //   alert(error.message);
    // }
  };

  return (
    <CreatePageLayout
      title="Create User"
      submitButtonText="Add User"
      onSubmit={handleSubmit(onSubmit)}
    >
      <Stack spacing={10} marginBottom={10} maxWidth="386px">
        <Input
          id="user-email"
          label="User's email"
          isRequired
          {...register("email")}
        />

        <Select
          id="department"
          label="Department"
          options={[
            { label: "Dept 1", value: "Dept-1" },
            { label: "Dept 2", value: "Dept-2" },
            { label: "Dept 3", value: "Dept-3" },
          ]}
          isRequired
          {...register("department")}
        />

        <Select
          id="select-role"
          label="Select Role"
          options={[
            { label: "Role 1", value: "Role-1" },
            { label: "Role 2", value: "Role-2" },
            { label: "Role 3", value: "Role-3" },
          ]}
          {...register("role")}
          isRequired
        />
      </Stack>
    </CreatePageLayout>
  );
};

export const CreateUserPageRoute = ({ component: Component, ...rest }) => {
  return <Route {...rest} render={(props) => <CreateUserPage {...props} />} />;
};
