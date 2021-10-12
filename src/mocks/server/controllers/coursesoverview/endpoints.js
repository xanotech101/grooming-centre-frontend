import { rest } from "msw";
import { getUrl } from "../../http";
import { handleSuccessResponse } from "../helpers";
import { requestCoursesOverviewDetailsRes } from "./responses";

const requestCoursesOverviewDetails = [
  rest.get(
    getUrl("/courses/overview"),
    handleSuccessResponse(requestCoursesOverviewDetailsRes)
  ),
];

const coursesOverview = [...requestCoursesOverviewDetails];

export default coursesOverview;