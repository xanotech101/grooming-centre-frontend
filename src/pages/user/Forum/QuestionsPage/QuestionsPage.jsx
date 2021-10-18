import { Route } from "react-router-dom";
import { Heading, QuestionListCard, Text } from "../../../../components";
import { PageLoaderLayout } from "../../../../layouts";
import { AskAQuestionButton } from "../../../../layouts/user/Forum/Header/Header";
import { capitalizeWords } from "../../../../utils";
import useQuestionsPage from "./hooks/useQuestionsPage";

const QuestionsPage = () => {
  const { questions } = useQuestionsPage();

  console.log(questions);

  const questionsIsEmpty =
    !questions.loading && !questions.err && !questions.data?.length
      ? true
      : false;

  return (
    <>
      {questions.loading && <PageLoaderLayout height="70%" width="100%" />}

      {questionsIsEmpty && (
        <PageLoaderLayout height="70%" width="100%">
          <Heading as="h3" marginBottom={3}>
            No Questions Asked Yet
          </Heading>
          <Text as="level3" marginBottom={7}>
            Be the first to ask a question.
          </Text>

          <AskAQuestionButton sm />
        </PageLoaderLayout>
      )}

      {questions.err && (
        <PageLoaderLayout height="70%" width="100%">
          <Heading as="h3" marginBottom={3} color="red.500">
            {capitalizeWords(questions.err)}
          </Heading>
        </PageLoaderLayout>
      )}

      {questions.data?.map((question) => (
        <QuestionListCard key={question.id} {...question} />
      ))}
    </>
  );
};

export const QuestionsPageRoute = ({ ...rest }) => {
  return <Route {...rest} render={(props) => <QuestionsPage {...props} />} />;
};
