import { rest } from "msw";
import { getUrl } from "../../http";
import { handleSuccessResponse } from "../helpers";
import { adminCreateDepartmentRes, adminGetDepartmentListingRes } from "./responses";


const adminGetDepartmentListing = rest.get(
  getUrl("/department/all"),
  handleSuccessResponse(adminGetDepartmentListingRes)
);

const adminCreateDepartment = rest.post(
  getUrl("/department/create"),
  handleSuccessResponse(adminCreateDepartmentRes)
);

const department = [adminGetDepartmentListing, adminCreateDepartment];


export default department;
