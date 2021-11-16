import { rest } from "msw";
import { getUrl } from "../../http";
import { handleSuccessResponse } from "../helpers";
import {
  adminCourseListingRes,
  userCourseDetailsRes_courseId_1,
  userCourseDetailsRes_courseId_3,
  adminGetUserCourseListingRes_userId_1,
  adminGetUserCourseListingRes_userId_2,
  adminGetUserCourseListingRes_userId_3,
  adminCreateCourseRes,
  adminEditCourseRes_courseId_1,
  adminEditCourseRes_courseId_3,
  userCourseListingRes,
} from "./responses";

const adminGetCourseListing = rest.get(
  getUrl("/course/admin/list"),
  handleSuccessResponse(adminCourseListingRes)
);

const adminCreateCourse = rest.post(
  getUrl("/course/create"),
  handleSuccessResponse(adminCreateCourseRes)
);

const userGetCourseListing = rest.get(
  getUrl("/course/user/courses"),
  handleSuccessResponse(userCourseListingRes)
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

const adminGetUserCourseListing = [
  rest.get(
    getUrl("/courses/userId_1"),
    handleSuccessResponse(adminGetUserCourseListingRes_userId_1)
  ),
  rest.get(
    getUrl("/courses/userId_2"),
    handleSuccessResponse(adminGetUserCourseListingRes_userId_2)
  ),
  rest.get(
    getUrl("/courses/userId_3"),
    handleSuccessResponse(adminGetUserCourseListingRes_userId_3)
  ),
];

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
  ...adminGetUserCourseListing,
  adminCreateCourse,
  ...userGetCourseDetails,
  ...adminEditCourse,
];

export default course;
