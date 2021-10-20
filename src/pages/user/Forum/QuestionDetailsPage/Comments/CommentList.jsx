import { useState } from "react";
import { CommentListCard, ReplyListCard } from "../../../../../components";

const CommentList = ({ data, onReplySuccess }) => {
  return data.map((comment) => (
    <CommentListItem onReplySuccess={onReplySuccess} comment={comment} />
  ));
};

const CommentListItem = ({ comment, onReplySuccess }) => {
  const [displayReplies, setDisplayReplies] = useState(false);

  const handleDisplayRepliesToggle = () => setDisplayReplies((prev) => !prev);

  const renderReplies = () =>
    displayReplies &&
    comment.replies.map((reply) => <ReplyListCard key={reply.id} {...reply} />);

  return (
    <>
      <CommentListCard
        key={comment.id}
        onReplySuccess={onReplySuccess}
        onReplyToggle={handleDisplayRepliesToggle}
        displayReplies={displayReplies}
        {...comment}
      />
      {renderReplies()}
    </>
  );
};

export default CommentList;
