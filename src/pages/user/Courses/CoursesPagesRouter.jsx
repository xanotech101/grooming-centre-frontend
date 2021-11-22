import { Box, Flex } from "@chakra-ui/layout";
import { Switch } from "react-router-dom";
import { Route } from "react-router-dom";
import { Heading } from "../../../components";
import { maxWidthStyles_userPages } from "../../../theme/breakpoints";
import AllCoursesPageRoute from "./AllCoursesPage";
import CompletedCoursesPageRoute from "./CompletedCoursesPage";
import InProgressCoursesPageRoute from "./InProgressCoursesPage";
// import NavBar from "./NavBar";
import NewCoursesPageRoute from "./NewCoursesPage";

const CoursesPagesRouter = () => {
  return (
    <Box
      {...maxWidthStyles_userPages}
      paddingY={{ base: 2, laptop: 5 }}
      paddingX={{ base: 2, laptop: 8, "laptop-l": 5 }}
    >
      <Flex
        as="header"
        alignItems="flex-end"
        justifyContent="space-between"
        height="100px"
        marginBottom={10}
      >
        <Heading as="h1" fontSize="heading.h2">
          Courses for you
        </Heading>

        {/* <NavBar display={{ base: "none", tablet: "flex" }} /> */}
      </Flex>

      <Box>
        <Switch>
          <AllCoursesPageRoute exact path="/courses" />
          <NewCoursesPageRoute exact path="/courses/new" />
          <CompletedCoursesPageRoute exact path="/courses/completed" />
          <InProgressCoursesPageRoute exact path="/courses/in-progress" />
        </Switch>
      </Box>
    </Box>
  );
};

export const CoursesPagesRoute = ({ ...rest }) => {
  return (
    <Route {...rest} render={(props) => <CoursesPagesRouter {...props} />} />
  );
};
