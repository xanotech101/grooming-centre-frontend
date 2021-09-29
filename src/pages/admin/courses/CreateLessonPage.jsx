import { Grid, GridItem } from "@chakra-ui/layout";

import { Route } from "react-router-dom";
import {
  DatePicker,
  Input,
  RichText,
  Select,
  TimePicker,
  Upload,
  useRichText,
} from "../../../components";
import { CreatePageLayout } from "../../../layouts";

const CreateLessonPage = () => {
  const richTextHook = useRichText();

  return (
    <CreatePageLayout title="Create Lesson" submitButtonText="Add Lesson">
      <Grid templateColumns="repeat(2, 1fr)" gap={10} marginBottom={10}>
        {/* Row 1 */}
        <GridItem colSpan={2}>
          <Input id="lesson-name" isRequired label="Lesson name" />
        </GridItem>

        {/* Row 2 */}
        <GridItem rowStart={2}>
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
          <TimePicker id="lesson-end-time" isRequired label="Lesson end time" />
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
          <Upload
            id="lesson-file"
            label="Lesson file"
            isRequired
            onFileSelect={(file) => console.log(file)}
          />
        </GridItem>
      </Grid>
    </CreatePageLayout>
  );
};

export const CreateLessonPageRoute = ({ component: Component, ...rest }) => {
  return (
    <Route {...rest} render={(props) => <CreateLessonPage {...props} />} />
  );
};
