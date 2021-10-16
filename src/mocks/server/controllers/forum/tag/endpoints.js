import { rest } from "msw";
import { getUrl } from "../../../http";
import { handleSuccessResponse } from "../../helpers";
import { userForumGetTagsRes } from "./responses";

const userForumGetTags = rest.get(
  // TODO: change `method`
  getUrl("/forum/tags"), // TODO: change `path`
  handleSuccessResponse(userForumGetTagsRes)
);

const forumTag = [userForumGetTags];

export default forumTag;
