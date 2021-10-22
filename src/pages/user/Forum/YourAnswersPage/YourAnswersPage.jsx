import { Route } from "react-router-dom";
import Comments from "../Comments/Comments";
import CommentList from "../Comments/CommentList";
import useYourAnswersPage from "./hooks/useYourAnswersPage";

const YourAnswersPage = () => {
  const { commentsManager } = useYourAnswersPage();

  return (
    <Comments commentsManager={commentsManager}>
      {({ comments, handleAddReply }) => (
        <>
          <CommentList
            data={comments.data}
            onReplySuccess={handleAddReply}
            commentCardProps={{ noBorder: true }}
          />
        </>
      )}
    </Comments>
  );
};

export const YourAnswersPageRoute = ({ ...rest }) => {
  return <Route {...rest} render={(props) => <YourAnswersPage {...props} />} />;
};
