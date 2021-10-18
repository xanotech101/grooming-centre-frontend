import { Box } from "@chakra-ui/react";
import { Switch } from "react-router-dom";
import {
  AddQuestionPageRoute,
  MentionsPageRoute,
  QuestionDetailsPageRoute,
  QuestionsPageRoute,
  TagsPageRoute,
  YourAnswersPageRoute,
  YourQuestionsPageRoute,
} from "../../../pages/user";

const MainArea = ({ ...rest }) => {
  return (
    <Box {...rest}>
      <Switch>
        <QuestionDetailsPageRoute path="/forum/questions/:id" />
        <QuestionsPageRoute path="/forum/details/questions" />
        <TagsPageRoute path="/forum/tags" />
        <MentionsPageRoute path="/forum/mentions" />
        <AddQuestionPageRoute path="/forum/your-questions/add" />
        <YourQuestionsPageRoute path="/forum/your-questions" />
        <YourAnswersPageRoute path="/forum/your-answers" />
      </Switch>
    </Box>
  );
};

export default MainArea;
