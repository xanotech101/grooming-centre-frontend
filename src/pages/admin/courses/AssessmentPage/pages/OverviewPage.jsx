import { Box, Flex, Grid, GridItem } from "@chakra-ui/layout";
import { useToast } from "@chakra-ui/toast";
import { useForm } from "react-hook-form";
import { Route, useParams, useHistory } from "react-router-dom";
import { Button, DateTimePicker, Input } from "../../../../../components";
import {
  useDateTimePicker,
  useGoBack,
  useQueryParams,
} from "../../../../../hooks";
import { AdminMainAreaWrapper } from "../../../../../layouts";
import { adminCreateAssessment } from "../../../../../services";
import {
  appendFormData,
  capitalizeFirstLetter,
  formatDateToISO,
} from "../../../../../utils";

const OverviewPage = () => {
  const { id: courseId } = useParams();

  const { push } = useHistory();

  const toast = useToast();

  const isExamination = useQueryParams().get("examination");
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const handleCancel = useGoBack();

  const startTimeManager = useDateTimePicker();

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

      const { message, assessment } = await adminCreateAssessment(body);

      toast({
        description: capitalizeFirstLetter(message),
        position: "top",
        status: "success",
      });
      setTimeout(() => {
        push(
          `/admin/courses/${courseId}/assessment/${assessment.id}/questions`
        );
      }, 3000);
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
                type="nuumber"
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

const OverviewPageRoute = ({ ...rest }) => {
  return <Route {...rest} render={(props) => <OverviewPage {...props} />} />;
};

export default OverviewPageRoute;
