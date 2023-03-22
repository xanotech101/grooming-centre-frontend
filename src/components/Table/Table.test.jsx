import { render, screen } from '@testing-library/react';
import user from '@testing-library/user-event';
import { Table } from '..';

const mockSetRows = jest.fn();

const mockTableProps = {
  columns: [
    { id: '156456', key: 'name', text: 'name' },
    { id: '3987', key: 'age', text: 'age' },
    { id: '2sd6', key: 'dob', text: 'dob' },
  ],

  options: {
    action: true,
    selection: true,
  },

  rows: {
    data: [
      {
        id: '2',
        name: 'name 1',
        age: 'age 1',
        dob: 'dob 1',
      },
      {
        id: '23w232',
        name: 'name 2',
        age: 'age 2',
        dob: 'dob 2',
      },
    ],
  },
  setRows: mockSetRows,
};

describe('Table component', () => {
  beforeEach(() => render(<Table {...mockTableProps} />));

  it('handles multiple selection', () => {
    const checkboxes = screen.getAllByRole('checkbox');

    const tableHeadCheckbox = checkboxes[0];
    user.click(tableHeadCheckbox);
    expect(screen.getByText(/2 selected/i)).toBeInTheDocument();
    expect(screen.getAllByRole('checkbox', { checked: true }).length).toBe(3);

    user.click(tableHeadCheckbox);
    expect(screen.queryByText(/2 selected/i)).not.toBeInTheDocument();
    expect(screen.queryAllByRole('checkbox', { checked: true }).length).toBe(0);

    user.click(tableHeadCheckbox);
    expect(screen.getByText(/2 selected/i)).toBeInTheDocument();
    expect(screen.getAllByRole('checkbox', { checked: true }).length).toBe(3);

    const deselectedAllButton = screen.getByTestId('deselect');
    user.click(deselectedAllButton);
    expect(screen.queryByText(/2 selected/i)).not.toBeInTheDocument();
    expect(screen.queryAllByRole('checkbox', { checked: true }).length).toBe(0);
  });

  it('handles isolated selection', () => {
    const checkboxes = screen.getAllByRole('checkbox');

    const tableBodyFirstCheckbox = checkboxes[1];
    user.click(tableBodyFirstCheckbox);
    expect(screen.getByText(/1 selected/i)).toBeInTheDocument();
    expect(screen.getAllByRole('checkbox', { checked: true }).length).toBe(1);

    user.click(tableBodyFirstCheckbox);
    expect(screen.queryByText(/1 selected/i)).not.toBeInTheDocument();
  });

  it('ensures delete handler is invoked', () => {
    const tableHeadCheckbox = screen.getAllByRole('checkbox')[0];
    user.click(tableHeadCheckbox);

    expect(screen.getByText(/2 selected/i)).toBeInTheDocument();

    const deleteButton = screen.getByTestId('delete');
    user.click(deleteButton);

    expect(mockSetRows).toHaveBeenCalled();
    expect(screen.queryByText(/2 selected/i)).not.toBeInTheDocument();
  });
});
