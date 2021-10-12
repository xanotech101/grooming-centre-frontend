import { rest } from "msw";
import { getUrl } from "../../http";
import { handleSuccessResponse } from "../helpers";
import {
  requestExaminationRes_examinationId_1,
  submitExaminationRes,
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

const examination = [...requestExaminationForAssessmentId, submitExamination];

export default examination;
