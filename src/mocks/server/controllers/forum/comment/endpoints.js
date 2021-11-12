import { rest } from "msw";
import { getUrl } from "../../../http";
import { handleSuccessResponse } from "../../helpers";
import {
  userForumGetCommentsRes_questionId_1,
  userForumGetCommentsRes_questionId_2,
  userForumGetCommentsRes_questionId_3,
  userForumAddCommentRes,
  // userForumReplyACommentRes,
  userForumGetMentionsRes,
  userForumGetYourAnswersRes,
  // userForumEditCommentRes,
  userForumDeleteCommentRes,
  userForumEditCommentRes_commentId_2,
  userForumEditCommentRes_replyId_3,
  userForumEditCommentRes_commentId_4,
  userForumCreateExpressionRes,
  userForumEditCommentRes_replyId_2,
} from "./responses";

const userForumGetComments = [
  rest.get(
    getUrl("/forum/questions/questionId_1/comments"),
    handleSuccessResponse(userForumGetCommentsRes_questionId_1)
  ),
  rest.get(
    getUrl("/forum/questions/questionId_2/comments"),
    handleSuccessResponse(userForumGetCommentsRes_questionId_2)
  ),
  rest.get(
    getUrl("/forum/questions/questionId_3/comments"),
    handleSuccessResponse(userForumGetCommentsRes_questionId_3)
  ),
];

const userForumEditComment = [
  rest.patch(
    getUrl("/forum/comment/replyId_3"),
    handleSuccessResponse(userForumEditCommentRes_replyId_3)
  ),
  rest.patch(
    getUrl("/forum/comment/replyId_2"),
    handleSuccessResponse(userForumEditCommentRes_replyId_2)
  ),
  rest.patch(
    getUrl("/forum/comment/commentId_2"),
    handleSuccessResponse(userForumEditCommentRes_commentId_2)
  ),
  rest.patch(
    getUrl("/forum/comment/commentId_3"),
    handleSuccessResponse(userForumEditCommentRes_commentId_4)
  ),
  rest.patch(
    getUrl("/forum/comment/commentId_4"),
    handleSuccessResponse(userForumEditCommentRes_commentId_4)
  ),
];

const userForumDeleteComment = [
  rest.delete(
    getUrl("/forum/comment/replyId_3"),
    handleSuccessResponse(userForumDeleteCommentRes)
  ),
  rest.delete(
    getUrl("/forum/comment/replyId_2"),
    handleSuccessResponse(userForumDeleteCommentRes)
  ),
  rest.delete(
    getUrl("/forum/comment/commentId_2"),
    handleSuccessResponse(userForumDeleteCommentRes)
  ),
  rest.delete(
    getUrl("/forum/comment/commentId_3"),
    handleSuccessResponse(userForumDeleteCommentRes)
  ),
  rest.delete(
    getUrl("/forum/comment/commentId_4"),
    handleSuccessResponse(userForumDeleteCommentRes)
  ),
];

const userForumCreateExpression = [
  rest.post(
    getUrl("/forum/comment/commentExpression"),
    handleSuccessResponse(userForumCreateExpressionRes)
  ),
];

const userForumAddComment = rest.post(
  // TODO: change `method`
  getUrl("/forum/comment/create"), // TODO: change `path`
  handleSuccessResponse(userForumAddCommentRes)
);

// const userForumAddReply = rest.post(
//   getUrl("/forum/comment/create"),
//   handleSuccessResponse(userForumReplyACommentRes)
// );

const userForumGetYourAnswers = rest.get(
  // TODO: change `method`
  getUrl("/forum/your-answers"), // TODO: change `path`
  handleSuccessResponse(userForumGetYourAnswersRes)
);

const userForumGetMentions = rest.get(
  // TODO: change `method`
  getUrl("/forum/mentions"), // TODO: change `path`
  handleSuccessResponse(userForumGetMentionsRes)
);

const forumComment = [
  ...userForumCreateExpression,
  ...userForumGetComments,
  ...userForumEditComment,
  ...userForumDeleteComment,
  userForumGetYourAnswers,
  userForumGetMentions,
  userForumAddComment,
  // userForumAddReply,
];

export default forumComment;
