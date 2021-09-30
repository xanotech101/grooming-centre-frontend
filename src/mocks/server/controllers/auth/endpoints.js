import { rest } from "msw";
import { getUrl } from "../../http";
import { handleSuccessResponse } from "../helpers";
import { adminInviteUserRes, superAdminInviteAdminRes } from "./responses";

const superAdminInviteAdmin = rest.post(
  getUrl("/superadmin/invite/admin"),
  handleSuccessResponse(superAdminInviteAdminRes)
);
const adminInviteUser = rest.post(
  getUrl("/admin/invite/user"),
  handleSuccessResponse(adminInviteUserRes)
);

const auth = {
  superAdminInviteAdmin,
  adminInviteUser,
};

export default auth;
