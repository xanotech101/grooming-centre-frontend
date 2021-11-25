import { rest } from "msw";
import { getUrl } from "../../http";
import { handleSuccessResponse } from "../helpers";
import { userGetGradesRes } from "./responses";

const userGetGrades = rest.get(
  getUrl("/grade/user"),
  handleSuccessResponse(userGetGradesRes)
);

const adminGetUserGrades = rest.get(
  getUrl("/admin/grades/userId_1"),
  handleSuccessResponse(userGetGradesRes)
);

const grades = [userGetGrades, adminGetUserGrades];

export default grades;