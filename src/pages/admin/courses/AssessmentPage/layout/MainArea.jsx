import { Box } from "@chakra-ui/layout";
import { Switch } from "react-router-dom";
import OverviewPageRoute from "../pages/OverviewPage";
import QuestionsPageRoute from "../pages/QuestionsPage";

const MainArea = () => {
  return (
    <Box flex={1} overflowY="scroll">
      <Switch>
        <OverviewPageRoute path="/admin/courses/:id/assessment/:assessmentId/overview" />
        <QuestionsPageRoute path="/admin/courses/:id/assessment/:assessmentId/questions" />
      </Switch>
    </Box>
  );
};

export default MainArea;
