import { useState } from "react";
import { CommentListCard, ReplyListCard } from "../../../../components";

const CommentList = ({
  data,
  commentCardHandlers,
  replyCardHandlers,
  commentCardProps,
  deleteStatusIsLoading,
  expStatusIsLoading,
}) => {
  return data.map((comment) => {
    // console.log(comment);

    return comment.commentId ? (
      <ReplyListCard
        key={comment.id}
        commentId={comment.commentId}
        viewComment
        deleteStatusIsLoading={deleteStatusIsLoading}
        {...replyCardHandlers}
        {...comment}
      />
    ) : (
      <CommentListItem
        key={comment.id}
        commentCardHandlers={commentCardHandlers}
        replyCardHandlers={replyCardHandlers}
        deleteStatusIsLoading={deleteStatusIsLoading}
        expStatusIsLoading={expStatusIsLoading}
        comment={{ ...comment, ...commentCardProps }}
      />
    );
  });
};

const CommentListItem = ({
  comment,
  commentCardHandlers,
  replyCardHandlers,
  deleteStatusIsLoading,
  expStatusIsLoading,
}) => {
  const [displayReplies, setDisplayReplies] = useState(false);
  const handleDisplayRepliesToggle = () => setDisplayReplies((prev) => !prev);
  const renderReplies = () =>
    displayReplies &&
    comment.replies
      .filter(({ active }) => active)
      .map((reply) => (
        <ReplyListCard
          key={reply.id}
          commentId={comment.id}
          deleteStatusIsLoading={deleteStatusIsLoading}
          {...replyCardHandlers}
          {...reply}
        />
      ));

  return (
    <>
      <CommentListCard
        key={comment.id}
        {...commentCardHandlers}
        onReplyToggle={handleDisplayRepliesToggle}
        displayReplies={displayReplies}
        deleteStatusIsLoading={deleteStatusIsLoading}
        expStatusIsLoading={expStatusIsLoading}
        {...comment}
      />
      {renderReplies()}
    </>
  );
};

export default CommentList;
