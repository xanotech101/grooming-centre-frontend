import { Box, Flex, Grid, GridItem } from "@chakra-ui/layout";
import { useForm } from "react-hook-form";
import { Route } from "react-router-dom";
import { Button, DateTimePicker, Input } from "../../../../../components";
import { useGoBack, useQueryParams } from "../../../../../hooks";
import { AdminMainAreaWrapper } from "../../../../../layouts";

const OverviewPage = () => {
const isExamination = useQueryParams().get("examination");
   const {
     register,
     handleSubmit,
     formState: { errors },
   } = useForm();
  
  const handleCancel = useGoBack();

   const onSubmit = async (data) => {
     console.log(data);
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
              // isRequired
              label="Start date & time"
              // value={startTimeManager.value}
              // onChange={startTimeManager.handleChange}
            />
          </GridItem>
            <GridItem>
              <Input
                label="Duration"
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
        <Button type="submit">Save</Button>
      </Flex>
      </Box>
      
    </AdminMainAreaWrapper>
  );
};

const OverviewPageRoute = ({ ...rest }) => {
  return <Route {...rest} render={(props) => <OverviewPage {...props} />} />;
};

export default OverviewPageRoute;
