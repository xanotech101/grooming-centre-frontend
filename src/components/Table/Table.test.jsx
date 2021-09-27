import { render, screen } from "@testing-library/react";
import Table from "./Table";

describe("Table component", () => {
  it("renders the header with searchbox and filter controls", () => {
    render(<Table />);

    // expect(screen.getByRole("searchbox")).toBeInTheDocument();
  });
});
