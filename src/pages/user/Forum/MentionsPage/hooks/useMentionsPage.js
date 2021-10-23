import { useCallback } from "react";
import { userForumGetMentions } from "../../../../../services";
import useComments from "../../Comments/hooks/useComments";

const useMentionsPage = () => {
  const fetcher = useCallback(async () => {
    const { comments } = await userForumGetMentions();
    return comments;
  }, []);

  const commentsManager = useComments(fetcher);

  return {
    commentsManager,
  };
};

export default useMentionsPage;
