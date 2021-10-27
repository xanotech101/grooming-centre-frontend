import { rest } from "msw";
import { getUrl } from "../../http";
import { handleSuccessResponse } from "../helpers";
import {
  adminGetExaminationListingRes_courseId_1,
  adminGetExaminationListingRes_courseId_3,
  requestAssessmentDetailsRes_assessmentId_1,
  requestAssessmentDetailsRes_assessmentId_2,
  submitAssessmentRes,
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

const adminGetAssessmentListing = [
  rest.get(
    getUrl("/assessment/course/courseId_1"),
    handleSuccessResponse(adminGetExaminationListingRes_courseId_1)
  ),
  rest.get(
    getUrl("/assessment/course/courseId_3"),
    handleSuccessResponse(adminGetExaminationListingRes_courseId_3)
  ),
];

const assessment = [
  ...requestAssessmentDetailsForAssessmentId,
  ...submitAssessment,
  ...adminGetAssessmentListing,
];

export default assessment;
