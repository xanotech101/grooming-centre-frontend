import { rest } from "msw";
import { getUrl } from "../../http";
import { handleSuccessResponse } from "../helpers";
import { userListingRes } from "./responses";

const getUserListing = rest.get(
  getUrl("/admin/users"),
  handleSuccessResponse(userListingRes)
);

const user = {
  getUserListing,
};

export default user;
