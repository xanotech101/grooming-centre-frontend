import { rest } from "msw";
import { getUrl } from "../http";

const courses = {
  courseListing: [
    {
      title: "The implication of financial crisis in the society",
      instructor: {
        firstName: "Roman",
        lastName: "job",
      },
      startDate: new Date(),
      isPublished: true,
    },
    {
      title: "The best course on automation testing",
      instructor: {
        firstName: "Richcode",
        lastName: "dart",
      },
      startDate: new Date(),
      isPublished: true,
    },
  ],
};

const handleSuccessResponse = (data) => (_req, res, ctx) =>
  res(ctx.status(200), ctx.json({ data }));

const getCourseListing = rest.get(
  getUrl("/admin/courses"),
  handleSuccessResponse(courses.courseListing)
);

const handlers = [getCourseListing];

export default handlers;
