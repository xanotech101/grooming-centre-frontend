import { useToast } from "@chakra-ui/toast";
import { Grid, GridItem } from "@chakra-ui/layout";
import {
  Route,
  useParams,
  // useHistory
} from "react-router-dom";
import {
  DateTimePicker,
  Input,
  RichText,
  Select,
  Upload,
  Breadcrumb,
  Link,
} from "../../../components";
import { CreatePageLayout } from "../../../layouts";
import { BreadcrumbItem, Box } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { useDateTimePicker, useUpload, useRichText } from "../../../hooks";
import { capitalizeFirstLetter, populateSelectOptions } from "../../../utils";
import { useApp } from "../../../contexts";
import { useEffect } from "react";

const CreateLessonPage = () => {
  const { courseId } = useParams();
  const courseIsUnknown = courseId === "unknown";

  // const history = useHistory();
  const toast = useToast();

  const {
    handleSubmit,
    register,
    watch,
    getValues,
    formState: { errors },
  } = useForm();

  const {
    state: { metadata },
    getOneMetadata,
  } = useApp();

  const startTimeManager = useDateTimePicker();
  const endTimeManager = useDateTimePicker();
  const fileManager = useUpload();
  const contentManager = useRichText();

  // Control `Lesson File` with `File Type`
  useEffect(() => {
    const subscription = watch((data, { name, type }) => {
      if (name === "lessonTypeId" && type === "change") {
        fileManager.handleFileSelect(null);

        const lessonType = getOneMetadata(
          "lessonType",
          data.lessonTypeId
        )?.name;

        if (lessonType === "pdf") {
          fileManager.handleAcceptChange("application/pdf");
        }
        if (lessonType === "video") {
          fileManager.handleAcceptChange("video/mp4, video/mkv");
        }
      }
    });
    return () => subscription.unsubscribe();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [watch, metadata]);

  const onSubmit = async (data) => {
    try {
      const startTime =
        startTimeManager.handleGetValueAndValidate("Start Time");
      const endTime = endTimeManager.handleGetValueAndValidate("End Time");
      const content = contentManager.handleGetValueAndValidate("Content");
      const file = fileManager.handleGetFileAndValidate("Lesson File");

      data = { ...data, startTime, endTime, file, content };

      console.log(data);
      toast({
        description: capitalizeFirstLetter("created"),
        position: "top",
        status: "success",
      });

      // history.push(`/admin/courses/:courseId_1/lesson/lessonId_1/view`);
    } catch (error) {
      toast({
        description: capitalizeFirstLetter(error.message),
        position: "top",
        status: "error",
      });
    }
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
          {courseIsUnknown && (
            <GridItem>
              <Select
                id="courseId"
                label="Select course"
                options={[
                  { label: "Course 1", value: "Course-1" },
                  { label: "Course 2", value: "Course-2" },
                  { label: "Course 3", value: "Course-3" },
                ]}
                isRequired
                error={errors.courseId?.message}
                {...register("courseId", {
                  required: "Please select a Course",
                })}
              />
            </GridItem>
          )}

          <GridItem colSpan={courseIsUnknown ? 1 : 2}>
            <Input
              id="title"
              isRequired
              label="Lesson title"
              error={errors.title?.message}
              {...register("title", { required: "Lesson title is required" })}
            />
          </GridItem>

          <GridItem>
            <DateTimePicker
              id="startTime"
              isRequired
              label="Start date & time"
              value={startTimeManager.value}
              onChange={startTimeManager.handleChange}
              // error={errors.startTime?.message}
              // {...register("startTime", { required: "Start time is required" })}
            />
          </GridItem>

          <GridItem>
            <DateTimePicker
              id="EndTime"
              isRequired
              label="End date & time"
              value={endTimeManager.value}
              onChange={endTimeManager.handleChange}
            />
          </GridItem>

          <GridItem colSpan={2}>
            <RichText
              height="250px"
              id="content"
              label="Content"
              onChange={contentManager.handleChange}
            />
          </GridItem>

          <GridItem>
            <Select
              id="lessonTypeId"
              label="File type"
              options={populateSelectOptions(metadata?.lessonType)}
              isLoading={!metadata?.lessonType}
              isRequired
              error={errors.lessonTypeId?.message}
              {...register("lessonTypeId", {
                required: "File type is required",
              })}
            />
          </GridItem>

          <GridItem colSpan={2}>
            <Upload
              id="file"
              label="Lesson file"
              isRequired
              videoUrl={fileManager.video.url}
              pdfUrl={fileManager.pdf.url}
              disabled={!getValues("lessonTypeId")}
              onFileSelect={fileManager.handleFileSelect}
              accept={fileManager.accept}
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
