import { useState } from "react";
import { CommentListCard, ReplyListCard } from "../../../../components";

const CommentList = ({ data, onReplySuccess, commentCardProps }) => {
  return data.map((comment) => (
    <CommentListItem
      key={comment.id}
      onReplySuccess={onReplySuccess}
      comment={{ ...comment, ...commentCardProps }}
    />
  ));
};

const CommentListItem = ({ comment, onReplySuccess }) => {
  const [displayReplies, setDisplayReplies] = useState(false);
  const handleDisplayRepliesToggle = () => setDisplayReplies((prev) => !prev);
  const renderReplies = () =>
    displayReplies &&
    comment.replies
      .filter(({ active }) => active)
      .map((reply) => <ReplyListCard key={reply.id} {...reply} />);

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
