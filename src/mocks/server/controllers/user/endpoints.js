import { rest } from "msw";
import { getUrl } from "../../http";
import { handleSuccessResponse } from "../helpers";
import {
  userListingRes,
  userDetailsRes_userId_1,
  userDetailsRes_userId_2,
  userDetailsRes_userId_3,
  adminEditUserRes_userId_1,
  adminEditUserRes_userId_2,
  adminEditUserRes_userId_3,
} from "./responses";

const adminGetUserListing = rest.get(
  getUrl("/admin/users"),
  handleSuccessResponse(userListingRes)
);

const adminGetUserDetails = [
  rest.get(
    getUrl("/admin/users/userId_1"),
    handleSuccessResponse(userDetailsRes_userId_1)
  ),
  rest.get(
    getUrl("/admin/users/userId_2"),
    handleSuccessResponse(userDetailsRes_userId_2)
  ),
  rest.get(
    getUrl("/admin/users/userId_3"),
    handleSuccessResponse(userDetailsRes_userId_3)
  ),
];

const adminEditUser = [
  rest.patch(
    getUrl("/admin/edit/user/userId_1"),
    handleSuccessResponse(adminEditUserRes_userId_1)
  ),
  rest.patch(
    getUrl("/admin/edit/user/userId_2"),
    handleSuccessResponse(adminEditUserRes_userId_2)
  ),
  rest.patch(
    getUrl("/admin/edit/user/userId_3"),
    handleSuccessResponse(adminEditUserRes_userId_3)
  ),
];

const user = [adminGetUserListing, ...adminGetUserDetails, ...adminEditUser];

export default user;
