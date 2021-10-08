import { rest } from "msw";
import { getUrl } from "../../http";
import { handleSuccessResponse } from "../helpers";
import {
  adminCourseListingRes,
  userCourseDetailsRes,
  userCourseListingRes,
} from "./responses";

const adminGetCourseListing = rest.get(
  getUrl("/admin/courses"),
  handleSuccessResponse(adminCourseListingRes)
);

const userGetCourseListing = rest.get(
  getUrl("/course/user/courses"),
  handleSuccessResponse(userCourseListingRes)
);

const userGetCourseDetails = rest.get(
  getUrl("/course/courseId_1"),
  handleSuccessResponse(userCourseDetailsRes)
);

const course = [
  adminGetCourseListing,
  userGetCourseListing,
  userGetCourseDetails,
];

export default course;
