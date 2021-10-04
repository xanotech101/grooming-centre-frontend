import { Box, Flex } from "@chakra-ui/layout";
import { Switch } from "react-router-dom";
import {
  CourseListingPageRoute,
  // CoursesPageRoute,
  CreateCoursePageRoute,
  CreateLessonPageRoute,
  CreateUserPageRoute,
  DashboardPageRoute,
  NotFoundPageRoute,
  UserInfoPageRoute,
  UserListingPageRoute,
} from "../../../pages/admin";

const MainArea = () => {
  return (
    <Flex flexDirection="column" flex={1}>
      <Box as="main" flex={1} overflowY="auto" flexBasis="1px">
        <Switch>
          <DashboardPageRoute exact path="/admin" />
          <CourseListingPageRoute exact path="/admin/courses" />
          <CreateCoursePageRoute exact path="/admin/courses/create" />
          <CreateLessonPageRoute
            exact
            path="/admin/courses/:id/lessons/create"
          />
          <UserListingPageRoute exact path="/admin/users" />
          <CreateUserPageRoute exact path="/admin/users/create" />
          <UserInfoPageRoute exact path="/admin/users/details/:id" />
          {/* 
            <DepartmentsPageRoute exact path="/admin/others/departments" />
            <RolesPageRoute exact path="/admin/other" /> 
          */}
          <NotFoundPageRoute />
        </Switch>
      </Box>
    </Flex>
  );
};

export default MainArea;
