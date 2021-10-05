import { rest } from "msw";
import { getUrl } from "../../http";
import { handleSuccessResponse } from "../helpers";
import { courseListingRes } from "./responses";

const adminGetCourseListing = rest.get(
  getUrl("/admin/courses"),
  handleSuccessResponse(courseListingRes)
);

const course = [adminGetCourseListing];

export default course;
