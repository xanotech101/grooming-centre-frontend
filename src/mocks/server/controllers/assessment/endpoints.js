import { rest } from "msw";
import { getUrl } from "../../http";
import { handleSuccessResponse } from "../helpers";
import {
  requestAssessmentDetailsRes_assessmentId_1,
  requestAssessmentDetailsRes_assessmentId_2,
  submitAssessmentRes,
  adminCreateAssessmentRes,
} from "./responses";

const requestAssessmentDetailsForAssessmentId = [
  rest.get(
    getUrl("/assessment/assessmentId_1"),
    handleSuccessResponse(requestAssessmentDetailsRes_assessmentId_1)
  ),
  rest.get(
    getUrl("/assessment/assessmentId_2"),
    handleSuccessResponse(requestAssessmentDetailsRes_assessmentId_2)
  ),
];

const submitAssessment = [
  rest.post(
    getUrl("/assessment/assessmentId_1/submit"),
    handleSuccessResponse(submitAssessmentRes)
  ),
  rest.post(
    getUrl("/assessment/assessmentId_2/submit"),
    handleSuccessResponse(submitAssessmentRes)
  ),
];

const adminCreateAssessment = rest.post(
  getUrl("/assessment/create"),
  handleSuccessResponse(adminCreateAssessmentRes)
);

const assessment = [
  ...requestAssessmentDetailsForAssessmentId,
  ...submitAssessment,
  adminCreateAssessment,
];

export default assessment;
