import { rest } from "msw";
import { getUrl } from "../../http";
import { handleSuccessResponse } from "../helpers";
import { adminGetDepartmentListingRes } from "./responses";

const adminGetDepartmentListing = rest.get(
  getUrl("/department/all"),
  handleSuccessResponse(adminGetDepartmentListingRes)
);

const department = [adminGetDepartmentListing];

export default department;
