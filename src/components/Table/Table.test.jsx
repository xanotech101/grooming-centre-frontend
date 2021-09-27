import { render, screen } from "@testing-library/react";
import user from "@testing-library/user-event";
import { Table } from "./Table";

describe("Table component", () => {
  it("renders the header with searchbox and filter controls", () => {
    render(<Table filterControls />);

    expect(screen.getByRole("searchbox")).toBeInTheDocument();
    expect(screen.getByTestId("filter-buttons")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /sort/i })).toBeInTheDocument();
  });

  it("renders the filter controls without the sort control", () => {
    render(<Table filterControls sortControl={false} />);

    expect(screen.getByTestId("filter-buttons")).toBeInTheDocument();
    expect(
      screen.queryByRole("button", { name: /sort/i })
    ).not.toBeInTheDocument();
  });

  it("renders without the filter controls and the sort control", () => {
    render(<Table sortControl />);

    expect(screen.queryByTestId("filter-buttons")).not.toBeInTheDocument();
    expect(
      screen.queryByRole("button", { name: /sort/i })
    ).not.toBeInTheDocument();
  });

  // it("renders `filter-tags` when user filters", () => {
  //   render(<Table filterControls />);

  //   const gradePointFilterButton = screen.getByRole("button", {
  //     name: /grade point/i,
  //   });

  //   user.click(gradePointFilterButton);
  // });

  it("displays the filter-body when a filter-button is clicked", () => {
    render(<Table filterControls />);
    const filterButtons = screen.getAllByTestId("filter-button");

    expect(screen.queryByTestId("filter-body")).not.toBeInTheDocument();

    filterButtons.forEach((filterButton) => {
      user.click(filterButton);
    });

    const filterBodies = screen.getAllByTestId("filter-body");
    expect(filterBodies.length).toBeGreaterThan(0);
  });

  it("renders a dropdown checkbox-form when click a gradePoint filter button", () => {
    render(<Table filterControls />);

    const gradePointFilterButton = screen.getByRole("button", {
      name: /grade point/i,
    });

    expect(screen.queryByTestId("filter-body")).not.toBeInTheDocument();

    user.click(gradePointFilterButton);

    expect(screen.getByTestId("filter-body")).toBeInTheDocument();

    expect(
      screen.getByRole("checkbox", { name: /1 to 30/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("checkbox", { name: /31 to 50/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("checkbox", { name: /51 to 70/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("checkbox", { name: /71 to 100/i })
    ).toBeInTheDocument();
  });
});
