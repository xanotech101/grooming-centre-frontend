import { rest } from "msw";
import { getUrl } from "../../http";
import { handleSuccessResponse } from "../helpers";
import {
  adminInviteUserRes,
  superAdminInviteAdminRes,
  userForgetPasswordRes,
  userResetPasswordRes,
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

const auth = [
  superAdminInviteAdmin,
  adminInviteUser,
  userResetPassword,
  userForgetPassword,
];

export default auth;
