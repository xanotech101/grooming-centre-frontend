import { Box, Flex } from "@chakra-ui/layout";

import { Switch } from "react-router-dom";
import {
  CoursesPageRoute,
  CreateCoursePageRoute,
  CreateLessonPageRoute,
  CreateUserPageRoute,
  DashboardPageRoute,
  NotFoundPageRoute,
} from "../../pages/admin";

const MainArea = () => {
  return (
    <Flex flexDirection="column" flex={1}>
      <Box
        as="main"
        paddingX={5}
        paddingY={2}
        flex={1}
        overflowY="auto"
        flexBasis="1px"
      >
        <Switch>
          <DashboardPageRoute exact path="/admin" />
          <CoursesPageRoute exact path="/admin/courses" />
          <CreateCoursePageRoute exact path="/admin/courses/create" />
          <CreateLessonPageRoute exact path="/admin/courses/create-lesson" />
          <CreateUserPageRoute exact path="/admin/users/create" />
          <NotFoundPageRoute />
        </Switch>
      </Box>
    </Flex>
  );
};

export default MainArea;
