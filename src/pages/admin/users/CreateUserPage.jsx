import { Stack } from "@chakra-ui/layout";

import { Route } from "react-router-dom";
import { Input, Select } from "../../../components";
import { CreatePageLayout } from "../../../layouts";

const CreateUserPage = () => {
  return (
    <CreatePageLayout title="Create User" submitButtonText="Add User">
      <Stack spacing={10} marginBottom={10} maxWidth="386px">
        <Input id="user-email" label="User's email" isRequired />

        <Input id="department" label="Department" isRequired />

        <Select
          id="select-role"
          label="Select Role"
          options={[
            { label: "Role 1", value: "Role-1" },
            { label: "Role 2", value: "Role-2" },
            { label: "Role 3", value: "Role-3" },
          ]}
          isRequired
        />
      </Stack>
    </CreatePageLayout>
  );
};

export const CreateUserPageRoute = ({ component: Component, ...rest }) => {
  return <Route {...rest} render={(props) => <CreateUserPage {...props} />} />;
};
