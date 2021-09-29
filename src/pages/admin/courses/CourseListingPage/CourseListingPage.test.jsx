import { render, screen } from "@testing-library/react";
import CourseListingPage from "./CourseListingPage";

describe("CourseListingPage", () => {
  beforeEach(() => render(<CourseListingPage />));

  it("renders the heading of page", () => {
    expect(
      screen.getByRole("heading", { name: /courses/i })
    ).toBeInTheDocument();
  });

  it("renders the `add course` button", () => {
    expect(
      screen.getByRole("button", { name: /add course/i })
    ).toBeInTheDocument();
  });

  it("renders a `table`", () => {
    expect(screen.getByRole("table")).toBeInTheDocument();
  });
});
