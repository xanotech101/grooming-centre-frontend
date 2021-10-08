import { rest } from "msw";
import { getUrl } from "../../http";
import { handleSuccessResponse } from "../helpers";
import {
  adminCourseListingRes,
  userCourseDetailsRes_courseId_1,
  userCourseDetailsRes_courseId_3,
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

const userGetCourseDetailsForCourseId_1 = rest.get(
  getUrl("/course/courseId_1"),
  handleSuccessResponse(userCourseDetailsRes_courseId_1)
);
const userGetCourseDetailsForCourseId_3 = rest.get(
  getUrl("/course/courseId_3"),
  handleSuccessResponse(userCourseDetailsRes_courseId_3)
);

const course = [
  adminGetCourseListing,
  userGetCourseListing,
  userGetCourseDetailsForCourseId_1,
  userGetCourseDetailsForCourseId_3,
];

export default course;
