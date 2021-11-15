import { rest } from "msw";
import { getUrl } from "../../../http";
import { handleSuccessResponse } from "../../helpers";
import { userForumGetUsernamesRes } from "./responses";

const userForumGetUsernames = rest.get(
  // TODO: change `method`
  getUrl("/forum/usernames"), // TODO: change `path`
  handleSuccessResponse(userForumGetUsernamesRes)
);

const forumMentions = [userForumGetUsernames];

export default forumMentions;
