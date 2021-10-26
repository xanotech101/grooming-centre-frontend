import { rest } from "msw";
import { getUrl } from "../../http";
import { handleSuccessResponse } from "../helpers";
import {
  adminCourseListingRes,
  userCourseDetailsRes_courseId_1,
  userCourseDetailsRes_courseId_3,
  userCourseListingRes,
  adminCreateCourseRes,
  adminEditCourseRes_courseId_1,
  adminEditCourseRes_courseId_3,
} from "./responses";

const adminGetCourseListing = rest.get(
  getUrl("/admin/courses"),
  handleSuccessResponse(adminCourseListingRes)
);

const adminCreateCourse = rest.post(
  getUrl("/course/create"),
  handleSuccessResponse(adminCreateCourseRes)
);

const adminEditCourse = [
  rest.patch(
    getUrl("/course/edit/courseId_1"),
    handleSuccessResponse(adminEditCourseRes_courseId_1)
  ),

  rest.patch(
    getUrl("/course/edit/courseId_3"),
    handleSuccessResponse(adminEditCourseRes_courseId_3)
  ),
];

const userGetCourseListing = rest.get(
  getUrl("/course/user/courses"),
  handleSuccessResponse(userCourseListingRes)
);

const userGetCourseDetails = [
  rest.get(
    getUrl("/course/courseId_1"),
    handleSuccessResponse(userCourseDetailsRes_courseId_1)
  ),
  rest.get(
    getUrl("/course/courseId_3"),
    handleSuccessResponse(userCourseDetailsRes_courseId_3)
  ),
];

const course = [
  adminGetCourseListing,
  userGetCourseListing,
  adminCreateCourse,
  ...userGetCourseDetails,
  ...adminEditCourse,
];

export default course;
