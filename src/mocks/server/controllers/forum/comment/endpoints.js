import { rest } from "msw";
import { getUrl } from "../../../http";
import { handleSuccessResponse } from "../../helpers";
import {
  userForumGetCommentsRes_questionId_1,
  userForumGetCommentsRes_questionId_2,
  userForumAddCommentRes,
  // userForumReplyACommentRes,
  userForumGetMentionsRes,
  userForumGetYourAnswersRes,
} from "./responses";

const userForumGetComments = [
  rest.get(
    // TODO: change `method`
    getUrl("/forum/questions/questionId_1/comments"), // TODO: change `path`
    handleSuccessResponse(userForumGetCommentsRes_questionId_1)
  ),
  rest.get(
    // TODO: change `method`
    getUrl("/forum/questions/questionId_2/comments"), // TODO: change `path`
    handleSuccessResponse(userForumGetCommentsRes_questionId_2)
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
  ...userForumGetComments,
  userForumGetYourAnswers,
  userForumGetMentions,
  userForumAddComment,
  // userForumAddReply,
];

export default forumComment;
