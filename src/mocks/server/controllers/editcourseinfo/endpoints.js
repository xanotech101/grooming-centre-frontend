import { rest } from "msw";
import { getUrl } from "../../http";
import { handleSuccessResponse } from "../helpers";
import {
  requestEditCourseInfoRes_courseId_1,
  requestEditCourseInfoRes_courseId_2,
} from "./responses";

const requestEditCourseInfo = [
  rest.post(
    getUrl("/course/edit/courseId_1"),
    handleSuccessResponse(requestEditCourseInfoRes_courseId_1)
  ),
  rest.post(
    getUrl("/course/edit/courseId_2"),
    handleSuccessResponse(requestEditCourseInfoRes_courseId_2)
  ),
];

const editCourse = [...requestEditCourseInfo,];

export default editCourse;
