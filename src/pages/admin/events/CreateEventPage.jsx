import { Box, Flex } from "@chakra-ui/layout";
import { useForm } from "react-hook-form";
import { BsPlusCircleFill } from "react-icons/bs";
import { Route } from "react-router-dom";
import { Button, Input, Textarea, Upload } from "../../../components";
import { useUpload } from "../../../hooks";
import { CreatePageLayout } from "../../../layouts";

const CreateEventPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();
  const thumbnailUpload = useUpload();

  const onSubmit = async (data) => {
    console.log(data);
  };
  return (
    <CreatePageLayout
      title="Create Event"
      submitButtonText={"Submit"}
      onSubmit={handleSubmit(onSubmit)}
      submitButtonIsLoading={isSubmitting}
    >
      <Box marginBottom={8}>
        <Input
          label="Title"
          id="title"
          {...register("title", {
            required: "Title is required",
          })}
          error={errors.title?.message}
        />
      </Box>
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
      <Flex width="30%" marginBottom={8}>
        <Input
          label="Event Speaker"
          width="90%"
          id="speaker"
          {...register("speaker", {
            required: "Event speaker is required",
          })}
          error={errors.speaker?.message}
        />
        <Box marginTop={9}>
          <Button asIcon>
            <BsPlusCircleFill size="24px" color="#800020" />
          </Button>
        </Box>
      </Flex>
      <Box width="50%" marginBottom={8}>
        <Input
          label="Event Location"
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
          isRequired
          label="Event Cover"
          onFileSelect={thumbnailUpload.handleFileSelect}
          imageUrl={thumbnailUpload.image.url}
          accept={thumbnailUpload.accept}
        />
      </Box>
    </CreatePageLayout>
  );
};

export const CreateEventPageRoute = ({ ...rest }) => {
  return <Route {...rest} render={(props) => <CreateEventPage {...props} />} />;
};
