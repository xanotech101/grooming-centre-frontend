import { Box, Flex, Grid, GridItem } from "@chakra-ui/layout";
import { useForm } from "react-hook-form";
import { Route } from "react-router-dom";
import { Button, DatePicker, Input, Text } from "../../../../../components";
import { useGoBack } from "../../../../../hooks";
import { AdminMainAreaWrapper } from "../../../../../layouts";

const OverviewPage = () => {

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
      <Box
        as="form"
        backgroundColor="white"
        onSubmit={handleSubmit(onSubmit)}
        marginY={14}
        marginX={6}
        padding={10}
      >
        <Input
          label="Assessment Title"
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
        <Grid templateColumns="repeat(2, 1fr)" gap={10} marginY={10}>
          <GridItem>
            <DatePicker id="date" isRequired label="Start date & time" />
          </GridItem>
          <GridItem>
            <Input
              label="Duration"
              id="duration"
              placeholder="Enter duration in minutes"
              {...register("duration", {
                required: "Please enter duration",
              })}
            />
            {errors.duration ? (
              <Text color="secondary.5" style={{ marginTop: 0 }}>
                {errors.duration.message}
              </Text>
            ) : null}
          </GridItem>
        </Grid>
      </Box>
      <Flex paddingY={10} marginX={6} justifyContent="space-between">
        <Button secondary onClick={handleCancel}>
          Cancel
        </Button>
        <Button type="submit">Save</Button>
      </Flex>
    </AdminMainAreaWrapper>
  );
};

const OverviewPageRoute = ({ ...rest }) => {
  return <Route {...rest} render={(props) => <OverviewPage {...props} />} />;
};

export default OverviewPageRoute;
