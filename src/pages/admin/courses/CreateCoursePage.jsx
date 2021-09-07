import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Box, Flex, Heading, Stack } from "@chakra-ui/layout";
import { Select } from "@chakra-ui/select";
import { Input, Textarea } from "@chakra-ui/react";
import React from "react";
import { Route } from "react-router-dom";
import { Button } from "../../../components";

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

      <Flex
        justifyContent="center"
        backgroundColor="white"
        paddingTop={10}
        paddingBottom={16}
      >
        <Box as="form" marginLeft="-100px" width="386px">
          <Stack spacing={7} marginBottom={10}>
            <FormControl id="course-title" isRequired>
              <FormLabel>Course title</FormLabel>
              <Input />
            </FormControl>
            <FormControl id="course-description" isRequired>
              <FormLabel>Course description</FormLabel>
              <Textarea resize="none" height="200px" />
            </FormControl>
            <FormControl id="course-duration" isRequired>
              <FormLabel>Course duration</FormLabel>
              <Input />
            </FormControl>
            <FormControl id="course-department" isRequired>
              <FormLabel>Select department</FormLabel>
              <Select>
                <option></option>
                <option>dept 1</option>
                <option>dept 2</option>
                <option>dept 3</option>
              </Select>
            </FormControl>
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
