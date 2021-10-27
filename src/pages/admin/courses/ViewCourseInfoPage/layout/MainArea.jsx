import { Box } from "@chakra-ui/layout";
import { Switch } from "react-router-dom";
import InfoPageRoute from "../pages/InfoPage";
import LessonPageRoute from "../pages/LessonPage";
import AssessmentListingPageRoute from "../pages/AssessmentListingPage";
import ExamPageRoute from "../pages/ExamPage";

const MainArea = () => {
  return (
    <Box flex={1} overflowY="scroll">
      <Switch>
        <InfoPageRoute path="/admin/courses/details/:id/info" />
        <LessonPageRoute path="/admin/courses/details/:id/lessons" />
        <AssessmentListingPageRoute path="/admin/courses/details/:id/assessment" />
        <ExamPageRoute path="/admin/courses/details/:id/exam" />
      </Switch>
    </Box>
  );
};

export default MainArea;
