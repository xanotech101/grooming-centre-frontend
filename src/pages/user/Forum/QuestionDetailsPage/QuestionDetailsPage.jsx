import { Route } from "react-router-dom";
import { Heading, QuestionListCard } from "../../../../components";
import { PageLoaderLayout } from "../../../../layouts";
import { capitalizeWords } from "../../../../utils";
import Comments from "../Comments/Comments";
import CommentList from "../Comments/CommentList";
import CommentForm, { CommentsHeader } from "../Comments/CommentForm";
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
          <QuestionListCard {...question.data} disabled />

          <Comments commentsManager={commentsManager} canAddComment>
            {({
              handleAddComment,
              comments,
              handleAddReply,
              handleDeleteComment,
              handleEditComment,
              handleDeleteReply,
              handleEditReply,
              deleteStatusIsLoading,
            }) => {
              console.log(comments);

              return (
                <>
                  {question.data?.active ? (
                    <CommentForm onCommentSuccess={handleAddComment} />
                  ) : (
                    <CommentsHeader />
                  )}
                  <CommentList
                    data={comments.data}
                    deleteStatusIsLoading={deleteStatusIsLoading}
                    commentCardHandlers={{
                      onCommentEditSuccess: handleEditComment,
                      onCommentDelete: handleDeleteComment,
                      onReplySuccess: handleAddReply,
                      onReplyDeleteSuccess: handleDeleteReply,
                      onReplyEditSuccess: handleEditReply,
                    }}
                    replyCardHandlers={{
                      onReplyDeleteSuccess: handleDeleteReply,
                      onReplyEditSuccess: handleEditReply,
                    }}
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
