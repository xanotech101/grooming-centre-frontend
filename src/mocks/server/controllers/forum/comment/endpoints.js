import { rest } from "msw";
import { getUrl } from "../../../http";
import { handleSuccessResponse } from "../../helpers";
import {
  userForumGetCommentsRes_questionId_1,
  userForumGetCommentsRes_questionId_2,
  userForumAddCommentRes,
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

const userForumAddComment = [
  rest.post(
    // TODO: change `method`
    getUrl("/forum/questions/questionId_1/comments/reply"), // TODO: change `path`
    handleSuccessResponse(userForumAddCommentRes)
  ),
  rest.post(
    // TODO: change `method`
    getUrl("/forum/questions/questionId_2/comments/reply"), // TODO: change `path`
    handleSuccessResponse(userForumAddCommentRes)
  ),
];

const forumComment = [...userForumGetComments, ...userForumAddComment];

export default forumComment;
