import { Box, Flex, Grid, GridItem } from "@chakra-ui/layout";
import { useToast } from "@chakra-ui/toast";
import { useForm } from "react-hook-form";
import { useParams, useHistory } from "react-router-dom";
import {
  Button,
  DateTimePicker,
  Input,
} from "../../../../../components";
import { useDateTimePicker, useGoBack } from "../../../../../hooks";
import { AdminMainAreaWrapper } from "../../../../../layouts";
import {
  adminCreateAssessment,
  adminCreateExamination,
} from "../../../../../services";
import {
  appendFormData,
  capitalizeFirstLetter,
  formatDateToISO,
} from "../../../../../utils";
import useAssessmentPreview from "../../../../user/Courses/TakeCourse/hooks/useAssessmentPreview";


const CreateAssessmentPage = () => {
  const { id: courseId, assessmentId } = useParams();

  const { push } = useHistory();
  const toast = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const handleCancel = useGoBack();

  const startTimeManager = useDateTimePicker();

  const { isExamination } = useAssessmentPreview(
    null,
    assessmentId
  );

  // Handle form submission
  const onSubmit = async (data) => {
    try {
      const startTime =
        startTimeManager.handleGetValueAndValidate("Start Time");

      data = {
        ...data,
        courseId,
        startTime: formatDateToISO(startTime),
      };

      const body = appendFormData(data);

      const { message, assessment, examination } = await (isExamination
        ? adminCreateExamination(body)
        : adminCreateAssessment(body));

      toast({
        description: capitalizeFirstLetter(message),
        position: "top",
        status: "success",
      });
      setTimeout(() => {
        isExamination
          ? push(
              `/admin/courses/${courseId}/assessment/${examination.id}/questions/new?examination=true`
            )
          : push(
              `/admin/courses/${courseId}/assessment/${assessment.id}/questions/new`
            );
      }, 2000);
    } catch (error) {
      toast({
        description: capitalizeFirstLetter(error.message),
        position: "top",
        status: "error",
      });
    }
  };

  return (
    <AdminMainAreaWrapper>
      <Box as="form" onSubmit={handleSubmit(onSubmit)} marginY={14} marginX={6}>
        <Box backgroundColor="white" padding={10}>
          <Input
            label={isExamination ? "Examination Title" : "Assessment Title"}
            id="title"
            error={errors.title?.message}
            {...register("title", {
              required: "Title is required",
            })}
          />
          <Grid templateColumns="repeat(2, 1fr)" gap={10} marginY={10}>
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
              <Input
                label="Duration"
                type="number"
                id="duration"
                placeholder="Enter duration in minutes"
                error={errors.duration?.message}
                {...register("duration", {
                  required: "Please enter duration",
                })}
              />
            </GridItem>
            <GridItem>
              <Input
                label="Number of Questions"
                type="number"
                id="numberOfQuestions"
                placeholder="Enter number of questions"
                error={errors.numberOfQuestions?.message}
                {...register("numberOfQuestions", {
                  required: "Please enter number of questions",
                })}
              />
            </GridItem>
          </Grid>
        </Box>
        <Flex paddingY={10} marginX={6} justifyContent="space-between">
          <Button secondary onClick={handleCancel}>
            Cancel
          </Button>
          <Button isLoading={isSubmitting} loadingText type="submit">
            Save
          </Button>
        </Flex>
      </Box>
    </AdminMainAreaWrapper>
  );
};

export default CreateAssessmentPage;