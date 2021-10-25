import { useToast } from "@chakra-ui/toast";
import { Grid, GridItem } from "@chakra-ui/layout";
import { useForm } from "react-hook-form";
import { Route } from "react-router-dom";
import {
  Input,
  Textarea,
  Select,
  Text,
  Breadcrumb,
  Link,
  Upload,
  Checkbox,
} from "../../../components";
import { CreatePageLayout } from "../../../layouts";
import { BreadcrumbItem, Box } from "@chakra-ui/react";
import { useApp } from "../../../contexts";
import { capitalizeFirstLetter, capitalizeWords } from "../../../utils";
import { useHistory } from "react-router";
import { adminCreateCourse } from "../../../services";

const CreateCoursePage = ({ metadata: propMetadata }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitSuccessful },
  } = useForm();

  const history = useHistory();
  const appManager = useApp();
  const metadata = propMetadata || appManager.state.metadata;

  const toast = useToast();

  const onSubmit = async (data) => {
    try {
      const body = { ...data, thumbnail: null, certificate: null };
      await adminCreateCourse(body);
      toast({
        description: capitalizeFirstLetter("Course Created successfully"),
        position: "top",
        status: "success",
      });

      history.push(`/admin/courses/details/courseId_1/info`);
    } catch (error) {
      toast({
        description: capitalizeFirstLetter(error.message),
        position: "top",
        status: "error",
      });
    }
  };

  const populateSelectOptions = (data, filterBody = () => true) => {
    return data?.filter(filterBody)?.map((item) => ({
      label: capitalizeWords(item.name),
      value: item.id,
    }));
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
              <Link href="#">Create Courses</Link>
            </BreadcrumbItem>
          }
        />
      </Box>

      <CreatePageLayout
        title="Create Course"
        submitButtonText="Add Course"
        onSubmit={handleSubmit(onSubmit)}
        submitButtonIsLoading={isSubmitSuccessful}
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
              label="Select department"
              options={populateSelectOptions(metadata?.departments)}
              id="departmentId"
              isLoading={!metadata?.departments}
              {...register("departmentId", {
                required: "Please select a department",
              })}
            />
            {errors.departmentId ? (
              <Text color="secondary.5" style={{ marginTop: 0 }}>
                {errors.departmentId.message}
              </Text>
            ) : null}
          </GridItem>
        </Grid>
        {/* Row 2 */}
        <Grid marginBottom={10}>
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
        {/* Row 3 */}
        <Grid marginBottom={10}>
          <GridItem colSpan={2}>
            <Upload
              id="courseFile"
              label="Course Image"
              isRequired
              onFileSelect={(file) => console.log(file)}
            />
          </GridItem>
        </Grid>
        {/* Row 4 */}
        <Grid marginBottom={10}>
          <GridItem colSpan={2}>
            <Upload
              id="course-certificate"
              label="Course Certificate"
              isRequired
              onFileSelect={(file) => console.log(file)}
            />
          </GridItem>
        </Grid>
        {/* Row 5 */}
        <Grid marginBottom={10}>
          <GridItem>
            <Checkbox
              label="Use default certificate"
              borderColor="primary.base"
            />
          </GridItem>
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
