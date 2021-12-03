import { rest } from "msw";
import { getUrl } from "../../http";
import { handleSuccessResponse } from "../helpers";
import {
  userGetGradesRes,
  adminEditGradeCriteriaRes,
  adminGetGradeCriteriaRes,
} from "./responses";

const userGetGrades = rest.get(
  getUrl("/grade/user"),
  handleSuccessResponse(userGetGradesRes)
);

const adminGetUserGrades = rest.get(
  getUrl("/admin/grades/userId_1"),
  handleSuccessResponse(userGetGradesRes)
);

const adminGetGradeCriteria = rest.get(
  getUrl("/admin/grade-criteria"), // TODO: might change `path`
  handleSuccessResponse(adminGetGradeCriteriaRes)
);

const adminEditGradeCriteria = rest.patch(
  getUrl("/admin/edit/grade-criteria"), // TODO: might change `path`
  handleSuccessResponse(adminEditGradeCriteriaRes)
);

const grades = [
  userGetGrades,
  adminGetUserGrades,
  adminEditGradeCriteria,
  adminGetGradeCriteria,
];

export default grades;
