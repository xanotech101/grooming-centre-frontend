import { Grid, GridItem } from "@chakra-ui/layout";

import { Route } from "react-router-dom";
import { Input, Textarea, Select } from "../../../components";
import { CreatePageLayout } from "../../../layouts";

const CreateCoursePage = () => {
  return (
    <CreatePageLayout title="Create Course" submitButtonText="Add Course">
      <Grid templateColumns="repeat(2, 1fr)" gap={10} marginBottom={10}>
        {/* Row 1 */}
        <GridItem colSpan={2}>
          <Input id="course-title" label="Course title" isRequired />
        </GridItem>

        {/* Row 2 */}
        <Textarea
          id="course-description"
          label="Course description"
          isRequired
          minHeight="150px"
        />
        <Select
          id="course-department"
          label="Course department"
          options={[
            { label: "Dept 1", value: "dept-1" },
            { label: "Dept 2", value: "dept-2" },
            { label: "Dept 3", value: "dept-3" },
          ]}
          isRequired
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
