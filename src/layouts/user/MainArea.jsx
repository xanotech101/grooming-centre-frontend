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
import { ExaminationsPageRoute } from "../../pages/user/ExaminationsPage/ExaminationsPage";
import { PollsPageRoute } from "../../pages/user/PollsPage/PollsPage";
import { PollsVotePageRoute } from "../../pages/user/PollsVotePage/PollsVotePage";
import { StandaloneExamsRoute } from "../../pages/user/StandaloneExamDetails/StandaloneExamsDetails";
import { StandalonePagesRoute } from "../../pages/user/StandaloneExaminations/StandaloneExaminations";

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
        <PollsPageRoute exact path="/polls" />
        <ExaminationsPageRoute exact path="/examinations" />
        <PollsVotePageRoute exact path="/polls/:pollId/vote" />
        <Redirect exact from="/" to="/dashboard" />
        <StandalonePagesRoute exact path="/standalone-exams" />
        <StandaloneExamsRoute exact path="/standalone-exams/:examid" />

        <Route render={(props) => <NotFoundPageRoute />} />
      </Switch>
    </Box>
  );
};

export default MainArea;
