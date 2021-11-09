import { useState } from "react";
import { CommentListCard, ReplyListCard } from "../../../../components";

const CommentList = ({
  data,
  commentCardHandlers,
  replyCardHandlers,
  commentCardProps,
  deleteStatusIsLoading,
}) => {
  return data.map((comment) => (
    <CommentListItem
      key={comment.id}
      commentCardHandlers={commentCardHandlers}
      replyCardHandlers={replyCardHandlers}
      deleteStatusIsLoading={deleteStatusIsLoading}
      comment={{ ...comment, ...commentCardProps }}
    />
  ));
};

const CommentListItem = ({
  comment,
  commentCardHandlers,
  replyCardHandlers,
  deleteStatusIsLoading,
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
        {...comment}
      />
      {renderReplies()}
    </>
  );
};

export default CommentList;
