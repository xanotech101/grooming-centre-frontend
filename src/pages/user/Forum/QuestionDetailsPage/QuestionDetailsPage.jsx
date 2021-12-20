import { useState } from "react";
import { Route } from "react-router-dom";
import { QuestionListCard } from "../../../../components";
import { PageLoaderLayout } from "../../../../layouts";
import { QuestionsPageErrorState } from "../../../../pages/user";
import Comments from "../Comments/Comments";
import CommentList from "../Comments/CommentList";
import CommentForm, { CommentsHeader } from "../Comments/CommentForm";
import useQuestionDetailsPage from "./hooks/useQuestionDetailsPage";

const QuestionDetailsPage = () => {
  const { question, commentsManager } = useQuestionDetailsPage();
  const [commentCount, setCommentCount] = useState(0);

  return (
    <>
      {question.loading && <PageLoaderLayout height="70%" width="100%" />}

      {question.err && <QuestionsPageErrorState />}

      {question.data && (
        <>
          <QuestionListCard
            {...question.data}
            commentCount={commentCount}
            disabled
          />

          <Comments commentsManager={commentsManager} canAddComment>
            {({
              handleAddComment,
              comments,
              handleAddReply,
              handleDeleteComment,
              handleEditComment,
              handleDeleteReply,
              handleEditReply,
              handleCommentExpression,
              deleteStatusIsLoading,
              expStatusIsLoading,
            }) => {
              setCommentCount(comments.data.length);

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
                    expStatusIsLoading={expStatusIsLoading}
                    commentCardHandlers={{
                      onCommentEditSuccess: handleEditComment,
                      onCommentDelete: handleDeleteComment,
                      onReplySuccess: handleAddReply,
                      onReplyDeleteSuccess: handleDeleteReply,
                      onReplyEditSuccess: handleEditReply,
                      onCommentExpression: handleCommentExpression,
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
