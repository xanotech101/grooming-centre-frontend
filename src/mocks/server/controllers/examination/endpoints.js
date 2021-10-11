import { rest } from "msw";
import { getUrl } from "../../http";
import { handleSuccessResponse } from "../helpers";
import {
  requestExaminationRes_examinationId_1,
  requestExaminationRes_examinationId_2,
  submitExaminationRes,
} from "./responses";

const requestExaminationForAssessmentId = [
  rest.get(
    getUrl("/assessment/examinationId_1"),
    handleSuccessResponse(requestExaminationRes_examinationId_1)
  ),
  rest.get(
    getUrl("/assessment/assessmentId_2"),
    handleSuccessResponse(requestExaminationRes_examinationId_2)
  ),
];

const submitExamination = rest.post(
  getUrl("/assessment/examinationId_1/submit"),
  handleSuccessResponse(submitExaminationRes)
);

const examination = [...requestExaminationForAssessmentId, submitExamination];

export default examination;
