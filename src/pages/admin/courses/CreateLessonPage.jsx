import { Box, Flex, Grid, GridItem, Heading } from "@chakra-ui/layout";
import React from "react";
import { Route } from "react-router-dom";
import {
  Button,
  DatePicker,
  Input,
  RichText,
  Select,
  Textarea,
  TimePicker,
  useRichText,
} from "../../../components";

const CreateLessonPage = () => {
  const richTextHook = useRichText();

  return (
    <Box as="section" paddingX={10} paddingTop={5} paddingBottom={10}>
      <Flex
        as="header"
        alignItems="center"
        height="150px"
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
            {/* Row 1 */}
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

            {/* Row 2 */}
            <GridItem rowStart={2}>
              <Input id="lesson-name" isRequired label="Lesson name" />
            </GridItem>
            <GridItem rowStart={2}>
              <DatePicker id="lesson-date" isRequired label="Lesson date" />
            </GridItem>

            {/* Row 3 */}
            <GridItem rowStart={3}>
              <TimePicker
                id="lesson-start-time"
                isRequired
                label="Lesson start time"
              />
            </GridItem>
            <GridItem rowStart={3}>
              <TimePicker
                id="lesson-end-time"
                isRequired
                label="Lesson end time"
              />
            </GridItem>

            {/* Row 4 */}
            <GridItem colSpan={2}>
              <RichText
                height="250px"
                id="content"
                label="Content"
                onChange={richTextHook.onChange}
              />
            </GridItem>

            {/* Row 5 */}
            <GridItem rowStart={5}>
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

          <Button onClick={() => console.log(richTextHook.data)}>
            Add Lesson
          </Button>
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
