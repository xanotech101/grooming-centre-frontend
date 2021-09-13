import { Box, Flex } from "@chakra-ui/layout";
import { Switch } from "react-router-dom";
import { Route } from "react-router-dom";
import { Heading } from "../../../components";
import AllCoursesPageRoute from "./AllCoursesPage";
import CompletedCoursesPageRoute from "./CompletedCoursesPage";
import InProgressCoursesPageRoute from "./InProgressCoursesPage";
import NavBar from "./NavBar";
import NewCoursesPageRoute from "./NewCoursesPage";

const CoursesPageRouter = () => {
  return (
    <section>
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

        {/* <NavBar /> */}
      </Flex>

      <Box minHeight="500px" border="1px">
        <Switch>
          <AllCoursesPageRoute exact path="/courses" />
          <NewCoursesPageRoute exact path="/courses/new" />
          <CompletedCoursesPageRoute exact path="/courses/completed" />
          <InProgressCoursesPageRoute exact path="/courses/in-progress" />
        </Switch>
      </Box>
    </section>
  );
};

export const CoursesPageRoute = ({ ...rest }) => {
  return (
    <Route {...rest} render={(props) => <CoursesPageRouter {...props} />} />
  );
};
