import { rest } from "msw";
import { getUrl } from "../../http";
import { handleSuccessResponse } from "../helpers";
import { courseListingRes } from "./responses";

const getCourseListing = rest.get(
  getUrl("/admin/courses"),
  handleSuccessResponse(courseListingRes)
);

const course = [getCourseListing];

export default course;
