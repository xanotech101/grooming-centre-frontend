import { Box, Flex, StackDivider } from "@chakra-ui/layout";
import PropTypes from "prop-types";
import Header from "./Header/Header";
import TableHead from "./TableHead/TableHead";
import TableBody from "./TableBody/TableBody";
import { useState } from "react";
import { Button, Text } from "..";
import { AiFillMinusSquare } from "react-icons/ai";
import { BiTrash } from "react-icons/bi";
import breakpoints from "../../theme/breakpoints";

const useTable = ({ rowsData, setRows }) => {
  const [selectedRows, setSelectedRows] = useState([]);

  /**
   * toggles all rows selection
   * @param {Array<{ id: string }>} rows
   *
   * @return void
   */
  const handleSelectRowsToggle = (rows) => {
    let newRows = [];

    if (!(selectedRows.length === rowsData.length)) {
      newRows = rows;
    }

    setSelectedRows(newRows);
  };

  /**
   * deselects all rows
   *
   * @return void
   */
  const handleDeselectAllRows = () => {
    setSelectedRows([]);
  };

  /**
   * toggles single row selection
   * @param {{ id: string }} row
   *
   * @return void
   */
  const handleSelectRowToggle = (row) => {
    const rows = [...selectedRows];
    const rowIndex = rows.findIndex(({ id }) => row.id === id);
    const rowIsNotSelected = rowIndex === -1;

    if (rowIsNotSelected) {
      rows.push(row);
    } else {
      rows.splice(rowIndex, 1);
    }

    setSelectedRows(rows);
  };

  /**
   * deletes many rows
   * @param {Array<{ id: string }>} selectedRows
   *
   * @return void
   */
  const handleDeleteRows = (selectedRows) => {
    const allRows = [...rowsData];

    selectedRows.forEach((row) => {
      const rowIndexInRowsData = allRows.findIndex(({ id }) => id === row.id);
      const rowIsInRowsData = rowIndexInRowsData !== -1;

      // deletes it from `rowsData`
      if (rowIsInRowsData) {
        allRows.splice(rowIndexInRowsData, 1);
      }
    });

    setRows({ data: allRows });
    handleDeselectAllRows();
  };

  return {
    selectedRows,
    handleDeselectAllRows,
    handleSelectRowsToggle,
    handleSelectRowToggle,
    handleDeleteRows,
  };
};

export const Table = ({
  rows,
  setRows,
  // filterControls,  //TODO: uncomment out later
  SearchBarVisibility,
  columns,
  options,
  templateColumns,
  columnGap = 2,
  generalRowStyles,

  // Calc from the width of the aside and margins
  width = "calc(100vw - 270px - 40px)",
  maxWidth = `calc(${breakpoints["laptop"]} + 100px)`,
}) => {
  const manager = useTable({ rowsData: rows.data, setRows });

  const getTemplateColumns = () =>
    columns.reduce(
      (prev, col) => (prev += col.fraction ? `${col.fraction} ` : "1fr "),
      ""
    );

  generalRowStyles = {
    ...generalRowStyles,
    borderBottom: "1px",
    borderColor: "accent.1",
  };

  const generalCellStyles = {
    // borderBottom: "1px",
    // borderColor: "accent.2",
    paddingX: columnGap,
  };

  const checkboxStyles = {
    ...generalCellStyles,
    // paddingLeft: 5,
    transform: "translate(2px, 5px)",
  };

  const commonProps = {
    rows,
    templateColumns: getTemplateColumns() || templateColumns,
    columns,
    options,
    columnGap,
    generalRowStyles,
    generalCellStyles,
    checkboxStyles,
    selectedRows: manager.selectedRows,
  };

  return (
    <Box>
      <Header
        SearchBarVisibility={SearchBarVisibility}
        // filterControls={filterControls}   //TODO: uncomment out later
      />

      <Box paddingTop={3} marginTop={3} borderTop="1px" borderColor="accent.2">
        {manager.selectedRows.length ? (
          <Flex alignItems="center" marginBottom={3}>
            <Button
              asIcon
              sm
              marginRight={2}
              data-testid="deselect"
              onClick={manager.handleDeselectAllRows}
            >
              <AiFillMinusSquare />
            </Button>

            <Text as="level3" bold>
              {manager.selectedRows.length} selected
            </Text>

            <Button
              asIcon
              sm
              marginLeft={10}
              data-testid="delete"
              onClick={manager.handleDeleteRows.bind(
                null,
                manager.selectedRows
              )}
            >
              <BiTrash />
            </Button>
          </Flex>
        ) : null}

        <Box
          divider={<StackDivider borderColor="gray.200" marginY={0} />}
          role="table"
          paddingBottom={5}
          width={width}
          maxWidth={maxWidth}
          overflowX="auto"
          backgroundColor="white"
        >
          <TableHead
            {...commonProps}
            onSelect={manager.handleSelectRowsToggle}
          />

          <TableBody
            {...commonProps}
            onRowSelect={manager.handleSelectRowToggle}
          />
        </Box>
      </Box>
    </Box>
  );
};

Table.propTypes = {
  // filterControls: PropTypes.array,   //TODO: uncomment out later
  SearchBarVisibility: PropTypes.string,
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.any.isRequired,
      key: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
      minWidth: PropTypes.string,
    })
  ).isRequired,
  options: PropTypes.shape({
    action: PropTypes.arrayOf(
      PropTypes.shape({
        text: PropTypes.any,
        isDelete: PropTypes.bool,
        deleteFetcher: PropTypes.func,
        link: PropTypes.func,
        props: PropTypes.object,
        onClick: PropTypes.func,
      })
    ),
    selection: PropTypes.bool,
  }),
  rows: PropTypes.shape({
    data: PropTypes.array,
    loading: PropTypes.bool,
    err: PropTypes.bool,
  }),
  setRows: PropTypes.func.isRequired,

  templateColumns: PropTypes.string,
  columnGap: PropTypes.any,
  generalRowStyles: PropTypes.object,
  width: PropTypes.string,
};
