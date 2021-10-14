import { Box } from "@chakra-ui/react";
import { Switch } from "react-router-dom";
import {
  MentionsRoute,
  QuestionsRoute,
  TagsRoute,
  YourAnswersRoute,
  YourQuestionsRoute,
} from "../../../pages/user";

const MainArea = ({ ...rest }) => {
  return (
    <Box {...rest}>
      <Switch>
        <QuestionsRoute path="/forum/questions" />
        <TagsRoute path="/forum/tags" />
        <MentionsRoute path="/forum/mentions" />
        <YourQuestionsRoute path="/forum/your-questions" />
        <YourAnswersRoute path="/forum/your-answers" />
      </Switch>
    </Box>
  );
};

export default MainArea;
