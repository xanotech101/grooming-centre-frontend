import { Box } from '@chakra-ui/layout';
import { useContext, useEffect, useState } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { ForumLayoutRoute, ChatLayoutRoute } from '../../layouts';
import { NotFoundPageRoute } from '../../pages/admin';

import {
  CourseDetailsPageRoute,
  CoursesPagesRoute,
  DashboardPageRoute,
  EventsPageRoute,
  LibraryPageRoute,
  GradesPageRoute,
  CertificatePageRoute,
  StandalonePagesRoute,
  StandaloneExamsStartRoute,
} from '../../pages/user';
import { ExaminationsPageRoute } from '../../pages/user/ExaminationsPage/ExaminationsPage';
import { PollsPageRoute } from '../../pages/user/PollsPage/PollsPage';
import { StandalonePreAssessmentRoute } from '../../pages/user/StandaloneExamDetails/StandalonePreAssessment';

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

        <StandalonePagesRoute exact path="/standalone-exams" />
        <StandalonePreAssessmentRoute exact path="/standalone-exams/take" />
        <StandaloneExamsStartRoute exact path="/standalone-exams/start" />
        <Redirect exact from="/" to="/dashboard" />
        <Route render={(props) => <NotFoundPageRoute />} />
      </Switch>
    </Box>
  );
};

export default MainArea;
