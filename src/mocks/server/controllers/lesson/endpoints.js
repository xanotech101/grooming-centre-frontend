import { rest } from "msw";
import { getUrl } from "../../http";
import { handleSuccessResponse } from "../helpers";
import {
  adminCreateLessonRes,
  adminEditLessonRes_lessonId_1,
  adminEditLessonRes_lessonId_2,
  requestEndLessonRes,
  adminGetLessonListingRes_courseId_1,
  adminGetLessonListingRes_courseId_3,
  requestLessonDetailsRes_lessonId_1,
  requestLessonDetailsRes_lessonId_2,
  requestLessonDetailsRes_lessonId_3,
} from "./responses";

const requestLessonDetailsForLessonId = [
  rest.get(
    getUrl("/lesson/lessonId_1"),
    handleSuccessResponse(requestLessonDetailsRes_lessonId_1)
  ),
  rest.get(
    getUrl("/lesson/lessonId_2"),
    handleSuccessResponse(requestLessonDetailsRes_lessonId_2)
  ),
  rest.get(
    getUrl("/lesson/lessonId_3"),
    handleSuccessResponse(requestLessonDetailsRes_lessonId_3)
  ),
];

const requestEndLesson = [
  rest.post(
    // TODO: change `method`
    getUrl("/lesson/lessonId_1/end"), // TODO: change `path`
    handleSuccessResponse(requestEndLessonRes)
  ),
  rest.post(
    // TODO: change `method`
    getUrl("/lesson/lessonId_2/end"), // TODO: change `path`
    handleSuccessResponse(requestEndLessonRes)
  ),
];

const adminCreateLesson = rest.post(
  // TODO: change `method`
  getUrl("/lesson/create"), // TODO: change `path`
  handleSuccessResponse(adminCreateLessonRes)
);

const adminEditLesson = [
  rest.patch(
    // TODO: change `method`
    getUrl("/lesson/edit/lessonId_1"), // TODO: change `path`
    handleSuccessResponse(adminEditLessonRes_lessonId_1)
  ),
  rest.patch(
    // TODO: change `method`
    getUrl("/lesson/edit/lessonId_2"), // TODO: change `path`
    handleSuccessResponse(adminEditLessonRes_lessonId_2)
  ),
];

const adminGetLessonListing = [
  rest.get(
    getUrl("/lesson/admin/courseId_1"),
    handleSuccessResponse(adminGetLessonListingRes_courseId_1)
  ),
  rest.get(
    getUrl("/lesson/admin/courseId_3"),
    handleSuccessResponse(adminGetLessonListingRes_courseId_3)
  ),
];


const lesson = [
  ...requestLessonDetailsForLessonId,
  ...requestEndLesson,
  ...adminEditLesson,
  ...adminGetLessonListing,
  adminCreateLesson,
];

export default lesson;
