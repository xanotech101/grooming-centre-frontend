import { useEffect } from "react";
import { Grid, GridItem, Box, Flex } from "@chakra-ui/layout";
import { useForm } from "react-hook-form";
import { Route } from "react-router-dom";
import {
  Input,
  Textarea,
  Select,
  Text,
  Breadcrumb,
  Link,
  Spinner,
  Heading,
  Upload,
} from "../../../components";
import { EditPageLayout } from "../../../layouts";
import { BreadcrumbItem } from "@chakra-ui/react";
import useCourseDetails from "../../user/Courses/CourseDetails/hooks/useCourseDetails";
import { useApp } from "../../../contexts";
import { capitalizeWords } from "../../../utils/formatString";
import useEditCourseInfo from "./hooks/useEditCourseInfo";

const EditCourseInfoPage = ({ metadata: propMetadata }) => {
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const appManager = useApp();

  const metadata = propMetadata || appManager.state.metadata;

  const { courseDetails, fetchCourseDetails } = useCourseDetails();

  useEffect(() => {
    fetchCourseDetails();
  }, [fetchCourseDetails]);

  const courseDetailsData = courseDetails.data;

  const isLoading = courseDetails.loading;
  const isError = courseDetails.err;

  useEffect(() => {
    if (courseDetailsData) {
      setValue("title", courseDetailsData.title);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [courseDetailsData]);
  useEffect(() => {
    if (courseDetailsData && metadata?.departments) {
      setValue("departmentId", courseDetailsData.departmentId);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [courseDetailsData, metadata?.departments]);
  useEffect(() => {
    if (courseDetailsData) {
      setValue("description", courseDetailsData.description);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [courseDetailsData]);

  const { submitEditedCourse } = useEditCourseInfo();

  const onSubmit = async (data) => {
    submitEditedCourse(data);
  };

  const populateSelectOptions = (data, filterBody = () => true) => {
    return data?.filter(filterBody)?.map((item) => ({
      label: capitalizeWords(item.name),
      value: item.id,
    }));
  };

  return isLoading || isError ? (
    <Flex
      // Make the height 100% of the screen minus the `height` of the Header and Footer
      height="calc(100vh - 200px)"
      justifyContent="center"
      alignItems="center"
    >
      {isLoading ? (
        <Spinner />
      ) : isError ? (
        <Heading color="red.500">{isError}</Heading>
      ) : null}
    </Flex>
  ) : (
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
        <Grid>
          <Upload
            id="courseImage"
            imageUrl={courseDetailsData?.thumbnail}
            alt="Course Image"
            label="Course Image"
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
