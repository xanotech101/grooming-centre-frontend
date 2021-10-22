import { Route } from "react-router-dom";
import Comments from "../Comments/Comments";
import CommentList from "../Comments/CommentList";
import useMentionsPage from "./hooks/useMentionsPage";
import { useApp } from "../../../../contexts";

const MentionsPage = () => {
  const { commentsManager } = useMentionsPage();
  const {
    state: { user },
  } = useApp();

  return (
    <Comments commentsManager={commentsManager}>
      {({ comments, handleAddReply }) => (
        <>
          <CommentList
            data={comments.data}
            onReplySuccess={handleAddReply}
            commentCardProps={{ noBorder: true, replyingToUser: user }}
          />
        </>
      )}
    </Comments>
  );
};

export const MentionsPageRoute = ({ ...rest }) => {
  return <Route {...rest} render={(props) => <MentionsPage {...props} />} />;
};
