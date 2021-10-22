import { Route } from "react-router-dom";
import { Grid, GridItem, Box, Flex } from "@chakra-ui/layout";
import { BreadcrumbItem } from "@chakra-ui/react";
import useViewLessonInfo from "./hooks/useViewLessonInfo";
import { useForm } from "react-hook-form";
import {
  Input,
  Textarea,
  Text,
  Breadcrumb,
  Link,
  Spinner,
  Heading,
  Upload,
  DateTimePicker
} from "../../../components";
import { EditPageLayout } from "../../../layouts";
import { useEffect, useState } from "react";

const EditLessonInfoPage = ({ metadata: propMetadata }) => {
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm();


  const manager = useViewLessonInfo();

  const { lesson, isLoading, isError } = manager;

  const [selectedDate, setSelectedDate] = useState(
    new Date()
  );

  useEffect(() => {
    setSelectedDate(new Date(lesson?.startTime));
  }, [lesson])

  useEffect(() => {
    if (lesson) {
      setValue("title", lesson.title);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lesson]);
  useEffect(() => {
    if (lesson) {
      setValue("content", lesson.content);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lesson]);

   useEffect(() => {
     if (lesson) {
       setValue("courseImage", lesson.thumbnail);
     }
     // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [lesson]);

  const onSubmit = async (data) => {
    console.log(data);
  };
  
  return isLoading || isError ? (
    <Flex
      // Make the height 100% of the screen minus the `height` of the Header and Footer
      height="calc(100vh - 200px)"
      justifyContent="center"
      alignItems="center"
    >
      {isLoading ? (
        <Spinner />
      ) : isError ? (
        <Heading color="red.500">{isError}</Heading>
      ) : null}
    </Flex>
  ) : (
    <>
      <Box paddingLeft={6}>
        <Breadcrumb
          item2={
            <BreadcrumbItem>
              <Link href="/admin/courses">Courses</Link>
            </BreadcrumbItem>
          }
          item3={
            <BreadcrumbItem isCurrentPage>
              <Link href={`/admin/courses/details/${lesson?.id}/lessons`}>
                Lessons
              </Link>
            </BreadcrumbItem>
          }
          item4={
            <BreadcrumbItem isCurrentPage>
              <Link href="#">Edit Lesson</Link>
            </BreadcrumbItem>
          }
        />
      </Box>

      <EditPageLayout
        title="Edit Lesson Details"
        submitButtonText="Save"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Grid templateColumns="repeat(2, 1fr)" gap={10} marginBottom={10}>
          {/* Row 1 */}
          <GridItem>
            <Input
              label="Lesson title"
              id="title"
              {...register("title", {
                required: "Title is required",
              })}
            />
            {errors.title ? (
              <Text color="secondary.5" style={{ marginTop: 0 }}>
                {errors.title.message}
              </Text>
            ) : null}
          </GridItem>
          <GridItem>
            <DateTimePicker
              label="Lesson date & time"
              id="date"
              value={selectedDate}
              onChange={setSelectedDate}
            />
          </GridItem>
        </Grid>

        {/* Row 2 */}
        <Grid marginBottom={10}>
          <Textarea
            minHeight="150px"
            label="Content"
            id="content"
            {...register("content", {
              required: "Please add a content",
            })}
          />
          {errors.content ? (
            <Text color="secondary.5" style={{ marginTop: 0 }}>
              {errors.content.message}
            </Text>
          ) : null}
        </Grid>
        {/* Row 3 */}
        <Grid>
          <Upload
            id="courseImage"
            imageUrl={lesson?.thumbnail}
            alt="Course Image"
            label="Course Image"
            {...register("courseImage")}
          />
        </Grid>
      </EditPageLayout>
    </>
  );
};

export const EditLessonInfoPageRoute = ({ component: Component, ...rest }) => {
  return (
    <Route {...rest} render={(props) => <EditLessonInfoPage {...props} />} />
  );
};
