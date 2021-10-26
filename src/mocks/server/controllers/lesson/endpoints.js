import { rest } from "msw";
import { getUrl } from "../../http";
import { handleSuccessResponse } from "../helpers";
import {
  adminCreateLessonRes,
  requestEndLessonRes,
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

const lesson = [
  ...requestLessonDetailsForLessonId,
  ...requestEndLesson,
  adminCreateLesson,
];

export default lesson;
