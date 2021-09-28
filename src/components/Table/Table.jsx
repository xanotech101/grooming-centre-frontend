import { Box, Flex, StackDivider, VStack } from "@chakra-ui/layout";
import PropTypes from "prop-types";
import Header from "./Header/Header";
import TableHead from "./TableHead/TableHead";

export const Table = ({
  filterControls,
  columns,
  options,
  templateColumns,
  columnGap,
  generalRowStyles,
}) => {
  const getTemplateColumns = () =>
    columns.reduce((prev) => (prev += "1fr "), "");

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
          <TableHead
            columns={columns}
            options={options}
            templateColumns={getTemplateColumns() || templateColumns}
            columnGap={columnGap}
            generalRowStyles={generalRowStyles}
            generalCellStyles={generalCellStyles}
            checkboxStyles={checkboxStyles}
          />

          <Box role="tbody"></Box>
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
      text: PropTypes.string.isRequired,
      minWidth: PropTypes.string,
    })
  ).isRequired,
  options: PropTypes.shape({
    action: PropTypes.bool,
    selection: PropTypes.bool,
  }),

  templateColumns: PropTypes.string,
  columnGap: PropTypes.any,
  generalRowStyles: PropTypes.object,
};
