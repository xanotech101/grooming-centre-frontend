import { rest } from "msw";
import { getUrl } from "../../../http";
import { handleSuccessResponse } from "../../helpers";
import { userForumGetTagsRes } from "./responses";

const userForumGetTags = rest.get(
  getUrl("/forum/tag"),
  handleSuccessResponse(userForumGetTagsRes)
);

const forumTag = [userForumGetTags];

export default forumTag;
