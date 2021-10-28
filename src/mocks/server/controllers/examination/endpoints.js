import { rest } from "msw";
import { getUrl } from "../../http";
import { handleSuccessResponse } from "../helpers";
import {
  requestExaminationRes_examinationId_1,
  submitExaminationRes,
  adminCreateExaminationRes,
  adminEditExaminationRes_examinationId_1,
  adminEditExaminationRes_examinationId_2,
} from "./responses";

const requestExaminationForAssessmentId = [
  rest.get(
    getUrl("/examination/examinationId_1"),
    handleSuccessResponse(requestExaminationRes_examinationId_1)
  ),
];

const submitExamination = rest.post(
  getUrl("/examination/examinationId_1/submit"),
  handleSuccessResponse(submitExaminationRes)
);


const adminCreateExamination = rest.post(
  getUrl("/examination/create"),
  handleSuccessResponse(adminCreateExaminationRes)
);


const adminEditExamination = [
  rest.patch(
    // TODO: change `method`
    getUrl("/examination/edit/examinationId_1"), // TODO: change `path`
    handleSuccessResponse(adminEditExaminationRes_examinationId_1)
  ),
  rest.patch(
    // TODO: change `method`
    getUrl("/examination/edit/examinationId_2"), // TODO: change `path`
    handleSuccessResponse(adminEditExaminationRes_examinationId_2)
  ),
];


const examination = [
  ...requestExaminationForAssessmentId,
  submitExamination,
  adminCreateExamination,
  ...adminEditExamination,
];

export default examination;
