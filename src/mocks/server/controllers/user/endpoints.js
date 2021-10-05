import { rest } from "msw";
import { getUrl } from "../../http";
import { handleSuccessResponse } from "../helpers";
import { userListingRes } from "./responses";

const adminGetUserListing = rest.get(
  getUrl("/admin/users"),
  handleSuccessResponse(userListingRes)
);

const user = [adminGetUserListing];

export default user;
