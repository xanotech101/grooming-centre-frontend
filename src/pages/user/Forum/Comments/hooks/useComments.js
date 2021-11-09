import { useToast } from "@chakra-ui/toast";
import { useEffect, useState } from "react";
import { useFetch } from "../../../../../hooks";
import { userForumDeleteComment } from "../../../../../services";

const useComments = (fetcher) => {
  const {
    resource: comments,
    setResource: setComments,
    handleFetchResource,
  } = useFetch();

  const toast = useToast();

  const [deleteStatus, setDeleteStatus] = useState({
    success: false,
    error: null,
    loading: false,
  });

  useEffect(() => {
    let isMount = true;

    if (deleteStatus.success && isMount) {
      toast({
        description: "Deleted Successfully!",
        position: "top",
        duration: 1000,
        status: "success",
      });
      setDeleteStatus({});
    }
    if (deleteStatus.error && isMount) {
      toast({
        description: deleteStatus.error.message,
        position: "top",
        duration: 1000,
        status: "error",
      });
      setDeleteStatus({});
    }

    return () => {
      isMount = false;
    };
  }, [deleteStatus.error, deleteStatus.success, toast]);

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

  const handleEditComment = (comment) => {
    const newComments = [...comments.data];
    const commentIndex = newComments.findIndex((c) => c.id === comment.id);
    newComments.splice(commentIndex, 1, comment);

    setComments((prev) => ({ ...prev, data: newComments }));
  };

  const handleEditReply = (commentId, reply) => {
    const newComments = [...comments.data];
    const comment = newComments.find((c) => c.id === commentId);
    const replyIndex = comment.replies.findIndex((r) => r.id === reply.id);
    comment.replies.splice(replyIndex, 1, reply);

    setComments((prev) => ({ ...prev, data: newComments }));
  };

  const handleDeleteComment = async (commentId) => {
    const UIHandler = () => {
      const newComments = [...comments.data];
      const comment = newComments.find((c) => c.id === commentId);
      comment.active = false;

      setComments((prev) => ({ ...prev, data: newComments }));
    };

    try {
      setDeleteStatus({ loading: true });
      await userForumDeleteComment(commentId);
      UIHandler();
      setDeleteStatus({ success: true });
    } catch (error) {
      setDeleteStatus({ error });
    } finally {
      setDeleteStatus({ loading: false });
    }
  };

  const handleDeleteReply = async (commentId, replyId) => {
    const UIHandler = () => {
      const newComments = [...comments.data];
      const comment = newComments.find((c) => c.id === commentId);
      comment.replies = comment.replies.filter((r) => r.id !== replyId);

      setComments((prev) => ({ ...prev, data: newComments }));
    };

    try {
      setDeleteStatus({ loading: true });
      await userForumDeleteComment(replyId);
      UIHandler();
      setDeleteStatus({ success: true });
    } catch (error) {
      setDeleteStatus({ error });
    } finally {
      setDeleteStatus({ loading: false });
    }
  };

  // Handle fetch category
  useEffect(() => {
    handleFetchResource({ fetcher });
  }, [handleFetchResource, fetcher]);

  return {
    comments,
    handleAddComment,
    handleEditComment,
    handleDeleteComment,
    handleAddReply,
    handleDeleteReply,
    handleEditReply,
    deleteStatusIsLoading: deleteStatus.loading,
  };
};

export default useComments;
