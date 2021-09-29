import { Grid, GridItem } from "@chakra-ui/layout";
import { useForm } from "react-hook-form";
import { Route } from "react-router-dom";
import { Input, Textarea, Select } from "../../../components";
import { CreatePageLayout } from "../../../layouts";

const CreateCoursePage = () => {
  const { register, handleSubmit } = useForm();

  const onSubmit = async (data) => {
    console.log(data);
  };

  return (
    <CreatePageLayout
      title="Create Course"
      submitButtonText="Add Course"
      onSubmit={handleSubmit(onSubmit)}
    >
      <Grid templateColumns="repeat(2, 1fr)" gap={10} marginBottom={10}>
        {/* Row 1 */}
        <GridItem colSpan={2}>
          <Input
            label="Course title"
            isRequired
            {...register("title")}
            id="title"
          />
        </GridItem>

        {/* Row 2 */}
        <Textarea
          minHeight="150px"
          label="Course description"
          isRequired
          {...register("description")}
          id="description"
        />
        <Select
          label="Course department"
          options={[
            { label: "Dept 1", value: "dept-1" },
            { label: "Dept 2", value: "dept-2" },
            { label: "Dept 3", value: "dept-3" },
          ]}
          isRequired
          {...register("department")}
          id="department"
        />
      </Grid>
    </CreatePageLayout>
  );
};

export const CreateCoursePageRoute = ({ component: Component, ...rest }) => {
  return (
    <Route {...rest} render={(props) => <CreateCoursePage {...props} />} />
  );
};
