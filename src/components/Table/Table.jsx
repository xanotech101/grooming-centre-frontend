import { Box, StackDivider } from "@chakra-ui/layout";
import PropTypes from "prop-types";
import Header from "./Header/Header";
import TableHead from "./TableHead/TableHead";
import TableBody from "./TableBody/TableBody";

export const Table = ({
  rows,
  filterControls,
  columns,
  options,
  templateColumns,
  columnGap,
  generalRowStyles,
}) => {
  const getTemplateColumns = () =>
    columns.reduce((prev) => (prev += "1fr "), "");

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
    templateColumns: getTemplateColumns() || templateColumns,
    columns,
    options,
    columnGap,
    generalRowStyles,
    generalCellStyles,
    checkboxStyles,
  };

  return (
    <Box>
      <Header filterControls={filterControls} />

      <Box paddingTop={3} marginTop={3} borderTop="1px" borderColor="accent.2">
        <Box
          divider={<StackDivider borderColor="gray.200" marginY={0} />}
          role="table"
          paddingBottom={5}
          // Calc from the width of the aside and margins
          width="calc(100vw - 270px - 40px)"
          overflowX="auto"
          backgroundColor="white"
        >
          <TableHead {...commonProps} />

          <TableBody rows={rows} {...commonProps} />
        </Box>
      </Box>
    </Box>
  );
};

Table.propTypes = {
  filterControls: PropTypes.array,
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.any.isRequired,
      key: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
      minWidth: PropTypes.string,
    })
  ).isRequired,
  options: PropTypes.shape({
    action: PropTypes.bool,
    selection: PropTypes.bool,
  }),
  rows: PropTypes.shape({
    data: PropTypes.array,
    loading: PropTypes.bool,
    err: PropTypes.bool,
  }),

  templateColumns: PropTypes.string,
  columnGap: PropTypes.any,
  generalRowStyles: PropTypes.object,
};
