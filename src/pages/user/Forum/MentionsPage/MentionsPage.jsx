import { Route } from "react-router-dom";
import Comments from "../Comments/Comments";
import CommentList from "../Comments/CommentList";
import useMentionsPage from "./hooks/useMentionsPage";

const MentionsPage = () => {
  const { commentsManager } = useMentionsPage();

  return (
    <Comments commentsManager={commentsManager}>
      {({ comments, handleAddReply }) => (
        <>
          <CommentList data={comments.data} onReplySuccess={handleAddReply} />
        </>
      )}
    </Comments>
  );
};

export const MentionsPageRoute = ({ ...rest }) => {
  return <Route {...rest} render={(props) => <MentionsPage {...props} />} />;
};
