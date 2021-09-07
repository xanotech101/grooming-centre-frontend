import { Box, Flex, Grid, GridItem, Heading } from "@chakra-ui/layout";
import React from "react";
import { Route } from "react-router-dom";
import {
  Button,
  DatePicker,
  Input,
  Select,
  Textarea,
} from "../../../components";

const CreateLessonPage = () => {
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
          Create Lesson
        </Heading>
      </Flex>

      <Flex backgroundColor="white" padding={10} paddingBottom={16}>
        <Box as="form" flex={1}>
          <Grid templateColumns="repeat(2, 1fr)" gap={10} marginBottom={10}>
            <GridItem>
              <Select
                id="select-course"
                label="Select course"
                options={[
                  { label: "Course 1", value: "Course-1" },
                  { label: "Course 2", value: "Course-2" },
                  { label: "Course 3", value: "Course-3" },
                ]}
                isRequired
              />
            </GridItem>

            <GridItem rowStart={2}>
              <Input id="lesson-name" isRequired label="Lesson name" />
            </GridItem>
            <GridItem rowStart={2}>
              {/* <Input
                id="lesson-datetime"
                isRequired
                label="Lesson date & time"
              /> */}
              <DatePicker />
            </GridItem>

            <GridItem colSpan={2}>
              <Textarea height="250px" id="content" label="Content" />
            </GridItem>

            <GridItem rowStart={4}>
              <Select
                id="file-type"
                label="File type"
                value="pdf"
                options={[
                  { label: "PDF", value: "pdf" },
                  { label: "Video", value: "video" },
                ]}
                isRequired
              />
            </GridItem>

            <GridItem colSpan={2}>
              <Textarea
                height="250px"
                id="lesson-file"
                isRequired
                label="Lesson file"
              />
            </GridItem>
          </Grid>

          <Button>Add Lesson</Button>
        </Box>
      </Flex>
    </Box>
  );
};

export const CreateLessonPageRoute = ({ component: Component, ...rest }) => {
  return (
    <Route {...rest} render={(props) => <CreateLessonPage {...props} />} />
  );
};
