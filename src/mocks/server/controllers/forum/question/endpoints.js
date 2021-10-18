import { rest } from "msw";
import { getUrl } from "../../../http";
import { handleSuccessResponse } from "../../helpers";
import {
  userForumPublishQuestionRes,
  userForumGetCategoriesRes,
} from "./responses";

const userForumGetCategories = rest.get(
  // TODO: change `method`
  getUrl("/forum/categories"), // TODO: change `path`
  handleSuccessResponse(userForumGetCategoriesRes)
);

const userForumPublishQuestion = rest.post(
  // TODO: change `method`
  getUrl("/forum/add-question"), // TODO: change `path`
  handleSuccessResponse(userForumPublishQuestionRes)
);

const forumQuestion = [userForumGetCategories, userForumPublishQuestion];

export default forumQuestion;
