import { Box, Flex, Heading, Stack } from "@chakra-ui/layout";
import React from "react";
import { Route } from "react-router-dom";
import { Button, Input, Textarea, Select } from "../../../components";

const CreateCoursePage = () => {
  return (
    <Box as="section" paddingX={10} paddingTop={5} paddingBottom={10}>
      <Flex
        as="header"
        alignItems="center"
        height="190px"
        backgroundColor="white"
        paddingX={5}
        marginBottom={5}
      >
        <Heading as="h1" size="lg">
          Create Course
        </Heading>
      </Flex>

      <Flex backgroundColor="white" padding={10} paddingBottom={16}>
        <Box as="form" width="386px">
          <Stack spacing={7} marginBottom={10}>
            <Input id="course-title" label="Course title" isRequired />

            <Textarea
              id="course-description"
              label="Course description"
              isRequired
              resize="none"
              height="200px"
            />

            <Input id="course-duration" label="Course duration" isRequired />

            <Select
              id="course-department"
              label="Course department"
              options={[
                { label: "Dept 1", value: "dept-1" },
                { label: "Dept 2", value: "dept-2" },
                { label: "Dept 3", value: "dept-3" },
              ]}
              isRequired
            />
          </Stack>

          <Button>Add Course</Button>
        </Box>
      </Flex>
    </Box>
  );
};

export const CreateCoursePageRoute = ({ component: Component, ...rest }) => {
  return (
    <Route {...rest} render={(props) => <CreateCoursePage {...props} />} />
  );
};
