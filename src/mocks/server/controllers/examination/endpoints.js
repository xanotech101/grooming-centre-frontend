import { rest } from "msw";
import { getUrl } from "../../http";
import { handleSuccessResponse } from "../helpers";
import {
  adminGetExaminationListingRes_courseId_3,
  adminGetExaminationListingRes_courseId_1,
  requestExaminationRes_examinationId_1,
  requestExaminationRes_examinationId_2,
  submitExaminationRes,
  adminCreateExaminationQuestionRes,
  adminCreateExaminationRes,
} from "./responses";

const requestExamination = [
  rest.get(
    getUrl("/examination/examinationId_1"),
    handleSuccessResponse(requestExaminationRes_examinationId_1)
  ),
  rest.get(
    getUrl("/examination/examinationId_2"),
    handleSuccessResponse(requestExaminationRes_examinationId_2)
  ),
];

const adminGetExaminationListing = [
  rest.get(
    getUrl("/examination/course/courseId_3"),
    handleSuccessResponse(adminGetExaminationListingRes_courseId_3)
  ),
  rest.get(
    getUrl("/examination/course/courseId_1"),
    handleSuccessResponse(adminGetExaminationListingRes_courseId_1)
  ),
];

const submitExamination = [
  rest.post(
    getUrl("/examination/examinationId_1/submit"),
    handleSuccessResponse(submitExaminationRes)
  ),
  rest.post(
    getUrl("/examination/examinationId_2/submit"),
    handleSuccessResponse(submitExaminationRes)
  ),
];

const adminCreateExaminationQuestion = rest.post(
  getUrl("/examination/question/create/new"),
  handleSuccessResponse(adminCreateExaminationQuestionRes)
);

const adminCreateExamination = rest.post(
  getUrl("/examination/create"),
  handleSuccessResponse(adminCreateExaminationRes)
);

const examination = [
  adminCreateExamination,
  adminCreateExaminationQuestion,
  ...requestExamination,
  ...adminGetExaminationListing,
  ...submitExamination,
];

export default examination;
