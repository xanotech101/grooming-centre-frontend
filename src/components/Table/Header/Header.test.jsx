import { render, screen } from "@testing-library/react";
import user from "@testing-library/user-event";
import Header, { FilterBody } from "./Header";

const filterControls = [
  {
    triggerText: "%Grade point",
    body: {
      checks: [
        { label: "1 to 30" },
        { label: "31 to 50" },
        { label: "51 to 70" },
        { label: "71 to 100" },
      ],
    },
  },
  {
    triggerText: "Department",
    body: {
      checks: [
        { label: "Finance" },
        { label: "Engineering" },
        { label: "Accounting" },
      ],
    },
  },
  {
    triggerText: "Role",
    body: {
      checks: [{ label: "super admin" }, { label: "admin" }, { label: "user" }],
    },
  },
  {
    triggerText: "Sort",
    noFilterTags: true,
    body: {
      radios: [
        { label: "Alphabetically: ascending" },
        { label: "Alphabetically: descending" },
        { label: "Date: ascending" },
        { label: "Date: descending" },
      ],
    },
  },
];

describe("Table Header component", () => {
  describe("when filterControls prop is passed", () => {
    beforeEach(() => render(<Header filterControls={filterControls} />));

    it("renders the header with searchbox and filter controls", () => {
      expect(screen.getByRole("searchbox")).toBeInTheDocument();
      expect(screen.getByTestId("filter-button-group")).toBeInTheDocument();
      expect(screen.getByRole("button", { name: /sort/i })).toBeInTheDocument();
    });

    it("displays the filter-body when a filter-button is clicked", () => {
      const filterButtons = screen.getAllByTestId(/filter-control/);
      expect(screen.queryByTestId("filter-body")).not.toBeInTheDocument();
      filterButtons.forEach((filterButton) => {
        user.click(filterButton);
      });
      const filterBodies = screen.getAllByTestId("filter-body");
      expect(filterBodies.length).toBeGreaterThan(0);
    });

    it("displays `apply/clear-all button` for checkboxes and hides the filter-body when clicked", () => {
      const filterButton = screen.getByRole("button", { name: /grade point/i });

      user.click(filterButton);
      let filterBody = screen.getByTestId("filter-body");
      expect(filterBody).toBeInTheDocument();

      const applyButton = screen.getByRole("button", { name: /apply/i });
      user.click(applyButton);
      filterBody = screen.queryByTestId("filter-body");
      expect(filterBody).not.toBeInTheDocument();

      user.click(filterButton);
      filterBody = screen.getByTestId("filter-body");
      expect(filterBody).toBeInTheDocument();

      const clearAllButton = screen.getByRole("button", { name: /clear all/i });
      user.click(clearAllButton);
      filterBody = screen.queryByTestId("filter-body");
      expect(filterBody).not.toBeInTheDocument();
    });

    it("displays `radios` and `closeButton` and hides them when clicked", () => {
      const sortFilterButton = screen.getByRole("button", {
        name: /sort/i,
      });
      user.click(sortFilterButton);
      let radios = screen.getAllByTestId("radio");
      expect(radios.length).toBe(4);

      const radio = radios[0];
      user.click(radio);
      radios = screen.queryAllByTestId("radio");
      expect(radios.length).toBe(0);

      user.click(sortFilterButton);
      const closeButton = screen.getByTestId("close");
      user.click(closeButton);
      radios = screen.queryAllByTestId("radio");
      expect(radios.length).toBe(0);
    });

    const handleAddStubTags = () => {
      const departmentFilterButton = screen.getByRole("button", {
        name: /department/i,
      });
      user.click(departmentFilterButton);

      const checkboxes = screen.getAllByRole("checkbox");
      checkboxes.forEach((checkbox) => user.click(checkbox));

      const applyButton = screen.getByText(/apply/i);
      user.click(applyButton);
    };

    it("renders `filter-tags` when user filters", () => {
      handleAddStubTags();

      const filterTags = screen.getAllByTestId("filter-tag");
      expect(filterTags.length).toBe(3);
    });

    it("removes a tag when deleted", () => {
      handleAddStubTags();

      let filterTags = screen.getAllByTestId("filter-tag");
      expect(filterTags.length).toBe(3);

      const deleteFilterTag = screen.getAllByLabelText("close")[0];
      user.click(deleteFilterTag);

      filterTags = screen.getAllByTestId("filter-tag");
      expect(filterTags.length).toBe(2);
    });
  });
});

describe("FilterBody - Unit component", () => {
  const mockOnApplyFilter = jest.fn();
  const mockOnClose = jest.fn();

  beforeEach(() => {
    const stubTags = [{ text: "Finance" }, { text: "Engineering" }];
    const stubDepartmentData = filterControls[1];

    render(
      <FilterBody
        data={stubDepartmentData}
        tags={stubTags}
        onApplyFilter={mockOnApplyFilter}
        onClose={mockOnClose}
      />
    );
  });

  it("ensures default checks in filter-body", () => {
    const checks = screen.getAllByRole("checkbox", { checked: true });
    expect(checks.length).toBe(2);
  });

  it("ensures the `clear-all` button click event is wired up correctly", () => {
    const clearAllButton = screen.getByRole("button", { name: /clear all/i });
    user.click(clearAllButton);

    expect(mockOnClose).toHaveBeenCalled();
    expect(mockOnApplyFilter).toHaveBeenCalled();
  });
});
