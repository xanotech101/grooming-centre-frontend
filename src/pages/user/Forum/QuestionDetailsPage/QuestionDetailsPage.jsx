import { Route } from "react-router-dom";
import { Heading, QuestionListCard } from "../../../../components";
import { PageLoaderLayout } from "../../../../layouts";
import { capitalizeWords } from "../../../../utils";
import Comments from "../Comments/Comments";
import CommentList from "../Comments/CommentList";
import CommentForm from "../Comments/CommentForm";
import useQuestionDetailsPage from "./hooks/useQuestionDetailsPage";

const QuestionDetailsPage = () => {
  const { question, commentsManager } = useQuestionDetailsPage();

  return (
    <>
      {question.loading && <PageLoaderLayout height="70%" width="100%" />}

      {question.err && (
        <PageLoaderLayout height="70%" width="100%">
          <Heading as="h3" marginBottom={3} color="red.500">
            {capitalizeWords(question.err)}
          </Heading>
        </PageLoaderLayout>
      )}

      {question.data && (
        <>
          <QuestionListCard key={question.id} {...question.data} disabled />

          <Comments commentsManager={commentsManager} canAddComment>
            {({ handleAddComment, comments, handleAddReply }) => {
              console.log(comments);

              return (
                <>
                  <CommentForm onCommentSuccess={handleAddComment} />
                  <CommentList
                    data={comments.data}
                    onReplySuccess={handleAddReply}
                  />
                </>
              );
            }}
          </Comments>
        </>
      )}
    </>
  );
};

export const QuestionDetailsPageRoute = ({ ...rest }) => {
  return (
    <Route {...rest} render={(props) => <QuestionDetailsPage {...props} />} />
  );
};
