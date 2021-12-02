import { Box, Grid } from "@chakra-ui/layout";
import { useToast } from "@chakra-ui/toast";
import { useForm } from "react-hook-form";
import { Route, useHistory } from "react-router-dom";
import {
  DateTimePicker,
  Input,
  Select,
  Textarea,
  Upload,
} from "../../../components";
import { useApp } from "../../../contexts";
import { useDateTimePicker, useUpload } from "../../../hooks";
import { CreatePageLayout } from "../../../layouts";
import { adminCreateEvent } from "../../../services";
import {
  appendFormData,
  capitalizeFirstLetter,
  formatDateToISO,
  populateSelectOptions,
} from "../../../utils";

const CreateEventPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();
  const coverImageManager = useUpload();
  const startTimeManager = useDateTimePicker();
  const endTimeManager = useDateTimePicker();

  const { push } = useHistory();
  const toast = useToast();
  const {
    state: { metadata },
  } = useApp();

  // Handle form submission
  const onSubmit = async (data) => {
    try {
      const startTime =
        startTimeManager.handleGetValueAndValidate("Start Time");
      const endTime = endTimeManager.handleGetValueAndValidate("End Time");
      const file = coverImageManager.handleGetFileAndValidate(
        "Event Cover",
        true
      );

      data = {
        ...data,
        file,
        startTime: formatDateToISO(startTime),
        endTime: formatDateToISO(endTime),
      };

      const body = appendFormData(data);

      const { message } = await // isEditMode
      // ? adminEditLesson(lessonId, body)
      //   :
      adminCreateEvent(body);

      // if (isEditMode) handleDelete(lesson.id);

      toast({
        description: capitalizeFirstLetter(message),
        position: "top",
        status: "success",
      });

      push(`/admin/events`);
    } catch (error) {
      console.error(error);
      toast({
        description: capitalizeFirstLetter(error.message),
        position: "top",
        status: "error",
      });
    }
  };

  return (
    <CreatePageLayout
      title="Create Event"
      submitButtonText={"Submit"}
      onSubmit={handleSubmit(onSubmit)}
      submitButtonIsLoading={isSubmitting}
    >
      <Grid templateColumns="repeat(2, 1fr)" gap={10} marginBottom={10}>
        <Input
          label="Title"
          isRequired
          id="title"
          {...register("title", {
            required: "Title is required",
          })}
          error={errors.title?.message}
        />

        <Select
          label="Select department"
          options={populateSelectOptions(metadata?.departments)}
          isRequired
          id="departmentId"
          isLoading={!metadata?.departments}
          {...register("departmentId", {
            required: "Please select a department",
          })}
          error={errors.departmentId?.message}
        />
      </Grid>

      <Box marginBottom={8}>
        <Textarea
          minHeight="150px"
          label="Description"
          id="description"
          isRequired
          {...register("description", {
            required: "Please add a description",
            maxLength: 1000,
          })}
          error={
            errors.description?.type === "maxLength"
              ? "Maximum length of 1000 characters"
              : errors.description?.message
          }
        />
      </Box>

      <Grid templateColumns="repeat(2, 1fr)" gap={10} marginBottom={10}>
        <DateTimePicker
          id="startTime"
          isRequired
          label="Start date & time"
          value={startTimeManager.value}
          onChange={startTimeManager.handleChange}
        />

        <DateTimePicker
          id="endTime"
          isRequired
          label="End date & time"
          value={endTimeManager.value}
          onChange={endTimeManager.handleChange}
        />
      </Grid>

      <Box width="50%" marginBottom={8}>
        <Select
          label="Event Location"
          isRequired
          defaultValue="virtual"
          options={[{ value: "virtual", label: "Virtual" }]}
          id="location"
          {...register("location", {
            required: "Event location is required",
          })}
          error={errors.location?.message}
        />
      </Box>

      <Box marginBottom={8}>
        <Upload
          id="thumbnail"
          label="Event Cover"
          onFileSelect={coverImageManager.handleFileSelect}
          imageUrl={coverImageManager.image.url}
          accept={coverImageManager.accept}
        />
      </Box>
    </CreatePageLayout>
  );
};

export const CreateEventPageRoute = ({ ...rest }) => {
  return <Route {...rest} render={(props) => <CreateEventPage {...props} />} />;
};
