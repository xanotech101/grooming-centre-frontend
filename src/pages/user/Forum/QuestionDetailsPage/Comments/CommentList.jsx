import { useState } from "react";
import { CommentListCard, ReplyListCard } from "../../../../../components";

const CommentList = ({ data }) => {
  return data.map((comment) => <CommentListItem comment={comment} />);
};

const CommentListItem = ({ comment }) => {
  const [displayReplies, setDisplayReplies] = useState(false);

  const handleDisplayRepliesToggle = () =>
    comment.replies.length && setDisplayReplies((prev) => !prev);

  const renderReplies = () =>
    displayReplies &&
    comment.replies.map((reply) => <ReplyListCard key={reply.id} {...reply} />);

  return (
    <>
      <CommentListCard
        key={comment.id}
        onReplyToggle={handleDisplayRepliesToggle}
        displayReplies={displayReplies}
        {...comment}
      />
      {renderReplies()}
    </>
  );
};

export default CommentList;
