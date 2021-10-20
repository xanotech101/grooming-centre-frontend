import { useEffect } from "react";
import { useCallback } from "react";
import { useParams } from "react-router";
import { useFetch } from "../../../../../hooks";
import { userForumGetComments } from "../../../../../services";

const useComments = () => {
  const { id } = useParams();
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

  const fetcher = useCallback(async () => {
    const { comments } = await userForumGetComments(id);
    return comments;
  }, [id]);

  // Handle fetch category
  useEffect(() => {
    handleFetchResource({ fetcher });
  }, [handleFetchResource, fetcher]);

  console.log(comments);

  return {
    comments,
    handleAddComment,
    handleAddReply,
  };
};

export default useComments;
