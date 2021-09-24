import { Box, Flex } from "@chakra-ui/layout";

import { Switch } from "react-router-dom";
import {
  CoursesPageRoute,
  CreateCoursePageRoute,
  CreateLessonPageRoute,
  CreateUserPageRoute,
  DashboardPageRoute,
  NotFoundPageRoute,
  UserInfoPageRoute,
} from "../../../pages/admin";

const MainArea = () => {
  return (
    <Flex flexDirection="column" flex={1}>
      <Box as="main" flex={1} overflowY="auto" flexBasis="1px">
        <Switch>
          <DashboardPageRoute exact path="/admin" />
          <CoursesPageRoute exact path="/admin/courses" />
          <UserInfoPageRoute exact path="/admin/users/:id" />
          <CreateCoursePageRoute exact path="/admin/manage/add-course" />
          <CreateLessonPageRoute exact path="/admin/manage/add-lesson" />
          <CreateUserPageRoute exact path="/admin/manage/add-user" />
          <NotFoundPageRoute />
        </Switch>
      </Box>
    </Flex>
  );
};

export default MainArea;
