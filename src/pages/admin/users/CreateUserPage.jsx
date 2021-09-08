import { Box, Flex, Grid, Heading, Stack, Text } from "@chakra-ui/layout";
import React from "react";
import { Route } from "react-router-dom";
import { Button, Input, Textarea, Select } from "../../../components";

const CreateUserPage = () => {
  return (
    <Box as="section" paddingX={10} paddingTop={5} paddingBottom={10}>
      <Flex
        shadow="md"
        as="header"
        flexDirection="column"
        justifyContent="center"
        height="150px"
        backgroundColor="white"
        paddingX={5}
        marginBottom={5}
      >
        <Heading as="h1" size="lg" marginBottom={4}>
          Create User
        </Heading>

        <Text>Lorem ipsum dolor sit amet, consectetur adipiscing elit. </Text>
      </Flex>

      <Flex backgroundColor="white" padding={10} paddingBottom={16} shadow="md">
        <Box as="form" flex={1}>
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

          <Button>Add User</Button>
        </Box>
      </Flex>
    </Box>
  );
};

export const CreateUserPageRoute = ({ component: Component, ...rest }) => {
  return <Route {...rest} render={(props) => <CreateUserPage {...props} />} />;
};
