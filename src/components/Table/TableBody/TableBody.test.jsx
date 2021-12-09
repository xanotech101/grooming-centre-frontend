import { render, screen } from "@testing-library/react";
import TableBody from "./TableBody";

const columns = [
  { id: "156456", key: "name", text: "name" },
  { id: "3987", key: "age", text: "age" },
  { id: "2sd6", key: "dob", text: "dob" },
];

const options = {
  action: true,
  selection: true,
};

describe("TableBody component", () => {
  it("renders a loading indicator", () => {
    const stubRows = { loading: true };
    render(<TableBody columns={columns} options={options} rows={stubRows} />);
    expect(screen.getByText("Loading...")).toBeInTheDocument();

    expect(screen.queryByText(/unavailable service/i)).not.toBeInTheDocument();
    const rows = screen.queryAllByRole("row");
    expect(rows.length).toBe(0);
  });

  it("renders a error message", () => {
    const stubRows = { err: true };
    render(<TableBody columns={columns} options={options} rows={stubRows} />);
    expect(screen.getByText(/unavailable service/i)).toBeInTheDocument();

    expect(screen.queryByText("Loading...")).not.toBeInTheDocument();
    const rows = screen.queryAllByRole("row");
    expect(rows.length).toBe(0);
  });

  describe("when `row.data` is passed", () => {
    beforeEach(() => {
      const stubRows = {
        data: [
          {
            id: "2",
            name: "name 1",
            age: "age 1",
            dob: "dob 1",
          },
          {
            id: "23w232",
            name: "name 2",
            age: "age 2",
            dob: "dob 2",
          },
        ],
      };
      render(<TableBody columns={columns} options={options} rows={stubRows} />);
    });

    it("renders a list of rows without a loading indicator", () => {
      const rows = screen.getAllByRole("row");
      expect(rows.length).toBe(2);

      expect(screen.queryByText("Loading...")).not.toBeInTheDocument();
      expect(
        screen.queryByText(/unavailable service/i)
      ).not.toBeInTheDocument();
    });

    it("renders checkboxes", () => {
      expect(screen.getAllByRole("checkbox").length).toBe(2);
      // expect(screen.getByRole("cell", { name: /action/i })).toBeInTheDocument();
    });

    it("renders row data correctly", () => {
      expect(screen.getAllByText(/name/i).length).toBe(2);
      expect(screen.getAllByText(/age/i).length).toBe(2);
      expect(screen.getAllByText(/dob/i).length).toBe(2);
    });
  });

  // it("renders a table-row of cells from passed data", () => {
  //   const cells = screen.getAllByRole("cell");
  //   expect(cells.length).toBe(4);

  //   expect(screen.getByRole("cell", { name: /name/i })).toBeInTheDocument();
  //   expect(screen.getByRole("cell", { name: /dob/i })).toBeInTheDocument();
  //   expect(screen.getByRole("cell", { name: /age/i })).toBeInTheDocument();
  // });

  //
});
