import { rest } from "msw";
import { getUrl } from "../../http";
import { handleSuccessResponse } from "../helpers";
import {
  adminInviteUserRes,
  superAdminInviteAdminRes,
  userForgetPasswordRes,
  userResetPasswordRes,
  requestUpdateDetailsRes,
} from "./responses";

const superAdminInviteAdmin = rest.post(
  getUrl("/superadmin/invite/admin"),
  handleSuccessResponse(superAdminInviteAdminRes)
);
const adminInviteUser = rest.post(
  getUrl("/admin/invite/user"),
  handleSuccessResponse(adminInviteUserRes)
);

const userResetPassword = rest.post(
  getUrl("/password/reset"),
  handleSuccessResponse(userResetPasswordRes)
);
const userForgetPassword = rest.post(
  getUrl("/forgot/password"),
  handleSuccessResponse(userForgetPasswordRes)
);

const requestUpdateDetails = rest.post(
  getUrl("/update-details"), //TODO: might change
  handleSuccessResponse(requestUpdateDetailsRes)
);

export const userForgetPasswordError = rest.post(
  getUrl("/forgot/password"),
  (_req, res, ctx) => res(ctx.status(500))
);
export const requestUpdateDetailsError = rest.post(
  getUrl("/update-details"),
  (_req, res, ctx) => res(ctx.status(500))
);

const auth = [
  superAdminInviteAdmin,
  adminInviteUser,
  userResetPassword,
  userForgetPassword,
  requestUpdateDetails,
];

export default auth;
