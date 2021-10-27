import { useToast } from "@chakra-ui/toast";
import { Flex, Grid, GridItem } from "@chakra-ui/layout";
import { Route, useParams, useHistory } from "react-router-dom";
import {
  DateTimePicker,
  Input,
  RichText,
  Select,
  Upload,
  Breadcrumb,
  Link,
  Heading,
  Spinner,
} from "../../../components";
import { CreatePageLayout } from "../../../layouts";
import { BreadcrumbItem, Box } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { useDateTimePicker, useUpload, useRichText } from "../../../hooks";
import {
  appendFormData,
  capitalizeFirstLetter,
  formatDateToISO,
  populateSelectOptions,
} from "../../../utils";
import { useApp } from "../../../contexts";
import { useEffect } from "react";
import { adminCreateLesson, adminEditLesson } from "../../../services";
import useViewLessonInfo from "./hooks/useViewLessonInfo";

const CreateLessonPage = () => {
  const { courseId, lessonId } = useParams();
  const isEditMode = lessonId && lessonId !== "new";
  const courseIsUnknown = courseId === "unknown";

  const { push } = useHistory();
  const toast = useToast();

  const {
    handleSubmit,
    register,
    watch,
    getValues,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm();

  const {
    state: { metadata },
    getOneMetadata,
  } = useApp();

  const startTimeManager = useDateTimePicker();
  const endTimeManager = useDateTimePicker();
  const fileManager = useUpload();
  const contentManager = useRichText();

  const { lesson, isLoading, isError } = useViewLessonInfo();

  // Init `Title` value
  useEffect(() => {
    if (lesson) {
      setValue("title", lesson.title);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lesson]);

  // Init `Dates` value
  useEffect(() => {
    if (lesson) {
      startTimeManager.handleChange(lesson.startTime);
      endTimeManager.handleChange(lesson.endTime);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lesson]);

  // Init `Content` data
  useEffect(() => {
    if (lesson) {
      contentManager.handleInitData(lesson.content);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lesson]);

  const setLessonAccept = (lessonTypeId) => {
    const lessonType = getOneMetadata("lessonType", lessonTypeId)?.name;

    if (lessonType === "pdf") {
      fileManager.handleAcceptChange("application/pdf");
    }

    if (lessonType === "video") {
      fileManager.handleAcceptChange("video/mp4, video/mkv");
    }
  };

  // Init `lessonTypeId` value and set `accept` for file upload input
  useEffect(() => {
    if (lesson && metadata) {
      setValue("lessonTypeId", lesson.lessonTypeId);
      setLessonAccept(lesson.lessonTypeId);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lesson, metadata]);

  // Init `Lesson File` file url
  useEffect(() => {
    if (lesson) {
      const fileIsAVideo = /((\.)(mp4|mkv))$/i.test(lesson.file);
      const fileIsPDF = /(\.pdf)$/i.test(lesson.file);

      if (fileIsAVideo) {
        fileManager.handleInitialVideoSelect(lesson.file);
      }
      if (fileIsPDF) {
        fileManager.handleInitialPdfSelect(lesson.file);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lesson]);

  // Control `Lesson File` with `File Type`
  useEffect(() => {
    const subscription = watch((data, { name, type }) => {
      console.log({ name, type, data });

      if (name === "lessonTypeId") {
        fileManager.handleFileSelect(null);

        setLessonAccept(data.lessonTypeId);
      }
    });

    return () => subscription.unsubscribe();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [watch, metadata]);

  // Handle form submission
  const onSubmit = async (data) => {
    try {
      const startTime =
        startTimeManager.handleGetValueAndValidate("Start Time");
      const endTime = endTimeManager.handleGetValueAndValidate("End Time");
      const content = contentManager.handleGetValueAndValidate("Content");
      const file = fileManager.handleGetFileAndValidate("Lesson File");

      data = {
        ...data,
        courseId,
        file,
        content,
        startTime: formatDateToISO(startTime),
        endTime: formatDateToISO(endTime),
      };

      const body = appendFormData(data);

      const { message, lesson } = await (isEditMode
        ? adminEditLesson(lessonId, body)
        : adminCreateLesson(body));

      toast({
        description: capitalizeFirstLetter(message),
        position: "top",
        status: "success",
      });

      push(`/admin/courses/${courseId}/lesson/${lesson.id}/view`);
    } catch (error) {
      toast({
        description: capitalizeFirstLetter(error.message),
        position: "top",
        status: "error",
      });
    }
  };

  return isEditMode && (isLoading || isError) ? (
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
        title={isEditMode ? "Edit Lesson details" : "Create Lesson"}
        submitButtonText={isEditMode ? "Update Lesson" : "Add Lesson"}
        onSubmit={handleSubmit(onSubmit)}
        submitButtonIsDisabled={!metadata}
        submitButtonIsLoading={isSubmitting}
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
                isRequire
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
              defaultValue={contentManager.data.default}
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
