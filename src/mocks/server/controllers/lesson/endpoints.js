import { rest } from "msw";
import { getUrl } from "../../http";
import { handleSuccessResponse } from "../helpers";
import {
  requestLessonDetailsRes_lessonId_1,
  requestLessonDetailsRes_lessonId_2,
  requestLessonDetailsRes_lessonId_3,
} from "./responses";

const requestLessonDetailsForLessonId_1 = rest.get(
  getUrl("/lesson/lessonId_1"),
  handleSuccessResponse(requestLessonDetailsRes_lessonId_1)
);
const requestLessonDetailsForLessonId_2 = rest.get(
  getUrl("/lesson/lessonId_2"),
  handleSuccessResponse(requestLessonDetailsRes_lessonId_2)
);
const requestLessonDetailsForLessonId_3 = rest.get(
  getUrl("/lesson/lessonId_3"),
  handleSuccessResponse(requestLessonDetailsRes_lessonId_3)
);

const lesson = [
  requestLessonDetailsForLessonId_1,
  requestLessonDetailsForLessonId_2,
  requestLessonDetailsForLessonId_3,
];

export default lesson;
