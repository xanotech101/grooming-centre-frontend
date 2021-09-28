import { render, screen } from "@testing-library/react";

import TableHead from "./TableHead";

const columns = [
  { id: "156456", text: "name" },
  { id: "3987", text: "age" },
  { id: "2sd6", text: "dob" },
];

const options = {
  action: true,
  selection: true,
};

describe("Table component", () => {
  beforeEach(() => render(<TableHead columns={columns} options={options} />));

  it("renders a table-row of cells from passed data", () => {
    const cells = screen.getAllByRole("cell");
    expect(cells.length).toBe(4);

    expect(screen.getByRole("cell", { name: /name/i })).toBeInTheDocument();
    expect(screen.getByRole("cell", { name: /dob/i })).toBeInTheDocument();
    expect(screen.getByRole("cell", { name: /age/i })).toBeInTheDocument();
  });

  it("renders checkbox and Action cell", () => {
    expect(screen.getByRole("checkbox")).toBeInTheDocument();
    expect(screen.getByRole("cell", { name: /action/i })).toBeInTheDocument();
  });
});
