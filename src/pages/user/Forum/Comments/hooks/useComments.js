import { useEffect } from "react";
import { useFetch } from "../../../../../hooks";

const useComments = (fetcher) => {
  const {
    resource: comments,
    setResource: setComments,
    handleFetchResource,
  } = useFetch();

  const handleAddReply = (commentId, reply) => {
    const newComments = [...comments.data];
    const comment = newComments.find(({ id }) => id === commentId);
    comment.replies = [reply, ...comment.replies];
    comment.replyCount = comment.replies.length;

    setComments((prev) => ({ ...prev, data: newComments }));
  };

  const handleAddComment = (comment) => {
    const newComments = [comment, ...comments.data];

    setComments((prev) => ({ ...prev, data: newComments }));
  };
  // Handle fetch category
  useEffect(() => {
    handleFetchResource({ fetcher });
  }, [handleFetchResource, fetcher]);

  return {
    comments,
    handleAddComment,
    handleAddReply,
  };
};

export default useComments;
