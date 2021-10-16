import { Grid, GridItem } from "@chakra-ui/layout";
import { useForm } from "react-hook-form";
import { Route } from "react-router-dom";
import { Input, Textarea, Select, Text, Breadcrumb } from "../../../components";
import { CreatePageLayout } from "../../../layouts";
import { BreadcrumbItem, BreadcrumbLink, Box } from "@chakra-ui/react";

const CreateCoursePage = () => {
  const {
    register,
    handleSubmit, formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    console.log(data);
  };

  return (
    <>
      <Box paddingLeft={6}>
        <Breadcrumb
          item2={
            <BreadcrumbItem>
              <BreadcrumbLink href="/admin/courses">Courses</BreadcrumbLink>
            </BreadcrumbItem>
          }
          item3={
            <BreadcrumbItem isCurrentPage>
              <BreadcrumbLink href="#">Create Courses</BreadcrumbLink>
            </BreadcrumbItem>
          }
        />
      </Box>

      <CreatePageLayout
        title="Create Course"
        submitButtonText="Add Course"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Grid templateColumns="repeat(2, 1fr)" gap={10} marginBottom={10}>
          {/* Row 1 */}
          <GridItem>
            <Input
              label="Course title"
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
            <Select
              label="Course department"
              options={[
                { label: "Dept 1", value: "dept-1" },
                { label: "Dept 2", value: "dept-2" },
                { label: "Dept 3", value: "dept-3" },
              ]}
              {...register("department", {
                required: "Please select a department",
              })}
            />
            {errors.department ? (
              <Text color="secondary.5" style={{ marginTop: 0 }}>
                {errors.department.message}
              </Text>
            ) : null}
          </GridItem>
        </Grid>
        {/* Row 2 */}
        <Grid mb={16}>
          <Textarea
            minHeight="150px"
            label="Course description"
            id="description"
            {...register("description", {
              required: "Please add a description",
            })}
          />
          {errors.description ? (
            <Text color="secondary.5" style={{ marginTop: 0 }}>
              {errors.description.message}
            </Text>
          ) : null}
        </Grid>
      </CreatePageLayout>
    </>
  );
};

export const CreateCoursePageRoute = ({ component: Component, ...rest }) => {
  return (
    <Route {...rest} render={(props) => <CreateCoursePage {...props} />} />
  );
};
