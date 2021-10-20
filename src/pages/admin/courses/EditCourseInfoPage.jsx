import { Grid, GridItem } from "@chakra-ui/layout";
import { useForm } from "react-hook-form";
import { Route } from "react-router-dom";
import {
  Input,
  Textarea,
  Select,
  Text,
  Breadcrumb,
  Link, Image
} from "../../../components";
import { EditPageLayout } from "../../../layouts";
import { BreadcrumbItem, Box } from "@chakra-ui/react";
import useCourselisting from "./hooks/useCourseListing";

const EditCourseInfoPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

 const manager = useCourselisting();

  const { courses } = manager;

  const onSubmit = async (data) => {
   console.log(data);
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
            <BreadcrumbItem isCurrentPage>
              <Link href="#">Edit Courses</Link>
            </BreadcrumbItem>
          }
        />
      </Box>

      <EditPageLayout
        title="Edit Course Details"
        submitButtonText="Save"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Grid templateColumns="repeat(2, 1fr)" gap={10} marginBottom={10}>
          {/* Row 1 */}
          <GridItem>
            <Input
              label="Course title"
              placeholder={courses?.[0].title}
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
              id="department"
              placeholder={courses?.[0].department}
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
        <Grid marginBottom={10}>
          <Textarea
            minHeight="150px"
            label="Course description"
            placeholder={courses?.[0].content}
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
        {/* Row 3 */}
        <Grid>
          <Text fontSize="text.level2" marginBottom={10}>
            Course Image
          </Text>
          <Image
            backgroundColor="accent.3"
            src={courses?.[0].thumbnail}
            alt="Course Header"
            width="223px"
            height="136px"
          />
        </Grid>
      </EditPageLayout>
    </>
  );
};

export const EditCourseInfoPageRoute = ({ component: Component, ...rest }) => {
  return (
    <Route {...rest} render={(props) => <EditCourseInfoPage {...props} />} />
  );
};
