import { rest } from "msw";
import { getUrl } from "../../http";
import { handleSuccessResponse } from "../helpers";
import {
  requestExaminationRes_examinationId_1,
  submitExaminationRes,
  adminCreateExaminationRes,
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

const examination = [...requestExaminationForAssessmentId, submitExamination, adminCreateExamination];

export default examination;
