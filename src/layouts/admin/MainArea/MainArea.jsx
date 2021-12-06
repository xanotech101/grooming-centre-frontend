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
  ViewCourseInfoPageRoute,
  ViewLessonInfoPageRoute,
  UserListingPageRoute,
  AssessmentPageRoute,
  DepartmentListingPageRoute,
  CreateDepartmentPageRoute,
  ViewDepartmentPageRoute,
  RolesPageRoute,
  SettingsPageRoute,
  EventsPageRoute,
  GradeCriteriaPageRoute,
  SecurityPageRoute,
  CreateEventPageRoute,
  LibraryListingPageRoute,
  CreateLibraryFilePageRoute,
  ViewFileDetailsPageRoute,
} from "../../../pages/admin";

const MainArea = () => {
  return (
    <Flex flexDirection="column" flex={1}>
      <Box as="main" flex={1} overflowY="auto" flexBasis="1px">
        <Switch>
          <DashboardPageRoute exact path="/admin" />
          <CourseListingPageRoute exact path="/admin/courses" />
          <CreateCoursePageRoute exact path="/admin/courses/edit/:id" />
          <CreateLessonPageRoute
            exact
            path="/admin/courses/:courseId/lessons/edit/:lessonId"
          />
          <AssessmentPageRoute path="/admin/courses/:id/assessment/:assessmentId" />
          <ViewCourseInfoPageRoute path="/admin/courses/details/:id" />

          <ViewLessonInfoPageRoute
            exact
            path="/admin/courses/:courseId/lesson/:lessonId/view"
          />
          <UserListingPageRoute exact path="/admin/users" />
          <CreateUserPageRoute exact path="/admin/users/edit/:id" />
          <UserInfoPageRoute path="/admin/users/details" />

          <DepartmentListingPageRoute exact path="/admin/departments" />
          <CreateDepartmentPageRoute exact path="/admin/departments/create" />
          <ViewDepartmentPageRoute
            exact
            path="/admin/departments/details/:departmentId/info"
          />
          <RolesPageRoute exact path="/admin/role" />

          <CreateEventPageRoute path="/admin/events/edit/:eventId" />
          <EventsPageRoute path="/admin/events" />

          <LibraryListingPageRoute exact path="/admin/library" />
          <CreateLibraryFilePageRoute exact path="/admin/library/edit/:id" />
          <ViewFileDetailsPageRoute exact path="/admin/library/details/:id" />

          <SecurityPageRoute path="/admin/settings/security" />
          <GradeCriteriaPageRoute path="/admin/settings/grade-criteria" />
          <SettingsPageRoute path="/admin/settings" />
          <NotFoundPageRoute />
        </Switch>
      </Box>
    </Flex>
  );
};

export default MainArea;
