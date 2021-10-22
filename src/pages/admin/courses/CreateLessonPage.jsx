import { Grid, GridItem } from "@chakra-ui/layout";

import { Route } from "react-router-dom";
import {
  DatePicker,
  Input,
  RichText,
  Select,
  TimePicker,
  Upload,
  useRichText, Breadcrumb, Link
} from "../../../components";
import { CreatePageLayout } from "../../../layouts";
import { BreadcrumbItem, Box } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router";

const CreateLessonPage = () => {
  const richTextHook = useRichText();
   const history = useHistory();

  const {
    handleSubmit,
  } = useForm();

   const onSubmit = async (data) => {
     console.log(data);
     setTimeout(() => {
       history.push(`/admin/courses/:courseId_1/lesson/lessonId_1/view`);
     }, 5000);
   };


  return (
    <>
      <Box paddingLeft={6}>
        <Breadcrumb
          item2={
            <BreadcrumbItem>
              <Link href="/admin/courses">Courses</Link>
            </BreadcrumbItem>
          }
          item3={
            <BreadcrumbItem>
              <Link href="#">Lessons</Link>
            </BreadcrumbItem>
          }
          item4={
            <BreadcrumbItem isCurrentPage>
              <Link href="#">Create</Link>
            </BreadcrumbItem>
          }
        />
      </Box>

      <CreatePageLayout
        title="Create Lesson"
        submitButtonText="Add Lesson"
        onSubmit={handleSubmit(onSubmit)}
      >
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
            <Upload
              id="lesson-file"
              label="Lesson file"
              isRequired
              onFileSelect={(file) => console.log(file)}
            />
          </GridItem>
        </Grid>
      </CreatePageLayout>
    </>
  );
};

export const CreateLessonPageRoute = ({ component: Component, ...rest }) => {
  return (
    <Route {...rest} render={(props) => <CreateLessonPage {...props} />} />
  );
};
