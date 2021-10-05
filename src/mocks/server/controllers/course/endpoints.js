import { rest } from "msw";
import { getUrl } from "../../http";
import { handleSuccessResponse } from "../helpers";
import { adminCourseListingRes, userCourseListingRes } from "./responses";

const adminGetCourseListing = rest.get(
  getUrl("/admin/courses"),
  handleSuccessResponse(adminCourseListingRes)
);

const userGetCourseListing = rest.get(
  getUrl("/course/user/courses"),
  handleSuccessResponse(userCourseListingRes)
);

const course = [adminGetCourseListing, userGetCourseListing];

export default course;
