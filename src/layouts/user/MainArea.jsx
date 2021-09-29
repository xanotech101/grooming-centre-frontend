import { Box } from "@chakra-ui/layout";
import { Redirect, Route, Switch } from "react-router-dom";

import {
  CourseDetailsPageRoute,
  CoursesPagesRoute,
  DashboardPageRoute,
  EventsPageRoute,
  ForumPageRoute,
  LibraryPageRoute,
} from "../../pages/user";

const MainArea = () => {
  return (
    <Box as="main" marginBottom={16}>
      <Switch>
        <DashboardPageRoute exact path="/dashboard" />
        <LibraryPageRoute exact path="/library" />
        <ForumPageRoute exact path="/forum" />
        <EventsPageRoute exact path="/events" />
        <CourseDetailsPageRoute path="/courses/details/:id" />
        <CoursesPagesRoute path="/courses" />
        <Redirect exact from="/" to="/courses" />

        <Route render={(props) => <div {...props}>Not found</div>} />
      </Switch>
    </Box>
  );
};

export default MainArea;
