import { Box } from "@chakra-ui/layout";
import { Redirect, Route, Switch } from "react-router-dom";
import { ForumLayoutRoute, ChatLayoutRoute } from "../../layouts";
import { NotFoundPageRoute } from "../../pages/admin";

import {
  CourseDetailsPageRoute,
  CoursesPagesRoute,
  DashboardPageRoute,
  EventsPageRoute,
  LibraryPageRoute,
  GradesPageRoute,
  CertificatePageRoute,
} from "../../pages/user";

const MainArea = () => {
  return (
    <Box as="main" marginBottom={16}>
      <Switch>
        <DashboardPageRoute exact path="/dashboard" />
        <LibraryPageRoute path="/library" />
        <ForumLayoutRoute path="/forum" />
        <ChatLayoutRoute path="/chats" />
        <EventsPageRoute exact path="/events" />
        <CourseDetailsPageRoute path="/courses/details/:id" />
        <GradesPageRoute path="/courses/grade-overview" />
        <CertificatePageRoute path="/courses/:course_id/certificate" />
        <CoursesPagesRoute path="/courses" />
        <Redirect exact from="/" to="/courses" />

        <Route render={(props) => <NotFoundPageRoute />} />
      </Switch>
    </Box>
  );
};

export default MainArea;
