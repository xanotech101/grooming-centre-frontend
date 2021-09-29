import { render, screen } from "@testing-library/react";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";
import CourseListingPage from "./CourseListingPage";

describe("CourseListingPage", () => {
  const history = createMemoryHistory();

  beforeEach(() =>
    render(
      <Router history={history}>
        <CourseListingPage />
      </Router>
    )
  );

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
