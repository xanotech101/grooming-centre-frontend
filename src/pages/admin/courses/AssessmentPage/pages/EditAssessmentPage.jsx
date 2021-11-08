import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useHistory, useParams } from "react-router";
import { Box, Flex, Grid, GridItem } from "@chakra-ui/layout";
import { useToast } from "@chakra-ui/toast";
import { Button, DateTimePicker, Input } from "../../../../../components";
import { useDateTimePicker, useGoBack } from "../../../../../hooks";
import { AdminMainAreaWrapper } from "../../../../../layouts";
import {
  adminEditAssessment,
  adminEditExamination,
} from "../../../../../services";
import useAssessmentPreview from "../../../../user/Courses/TakeCourse/hooks/useAssessmentPreview";
import {
  appendFormData,
  capitalizeFirstLetter,
  formatDateToISO,
} from "../../../../../utils";

const EditAssessmentPage = () => {
  const { id: courseId, assessmentId } = useParams();

  const { push } = useHistory();
  const toast = useToast();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm();

  const handleCancel = useGoBack();

  const startTimeManager = useDateTimePicker();

  const { assessment, isExamination } = useAssessmentPreview(
    null,
    assessmentId
  );

  console.log(assessment)

  // Init `Title` value
  useEffect(() => {
    if (assessment) {
      setValue("title", assessment.topic);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [assessment]);

  // Init `StartTime` value
  useEffect(() => {
    if (assessment?.startTime) {
      startTimeManager.handleChange(assessment.startTime);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [assessment?.startTime]);

  // Init `Duration` value
  useEffect(() => {
    if (assessment) {
      setValue("duration", assessment.duration);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [assessment]);

  // Init `Number of Questions` value
  useEffect(() => {
    if (assessment) {
      setValue("amountOfQuestions", assessment?.questionCount);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [assessment]);

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

      const { message } = await (isExamination
        ? adminEditExamination(assessmentId, body)
        : adminEditAssessment(assessmentId, body));

      toast({
        description: capitalizeFirstLetter(message),
        position: "top",
        status: "success",
      });
      setTimeout(() => {
        isExamination
          ? push(`/admin/courses/details/${courseId}/exam`)
          : push(`/admin/courses/details/${courseId}/assessment`);
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
                id="amountOfQuestions"
                placeholder="Enter number of questions"
                error={errors.amountOfQuestions?.message}
                {...register("amountOfQuestions", {
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
            Update
          </Button>
        </Flex>
      </Box>
    </AdminMainAreaWrapper>
  );
};

export default EditAssessmentPage;
