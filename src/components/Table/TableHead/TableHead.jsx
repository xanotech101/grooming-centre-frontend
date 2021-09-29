import { Box, Grid } from "@chakra-ui/react";
import { Checkbox, Text } from "../../";

const TableHead = ({
  columns,
  options,
  templateColumns,
  columnGap,
  generalRowStyles,
  generalCellStyles,
  checkboxStyles,
}) => {
  const getTemplateColumns = () =>
    `${options?.selection ? "20px " : ""}${templateColumns}${
      options?.action ? " auto" : ""
    }`;

  return (
    <Box role="thead">
      <Grid
        role="row"
        alignItems="center"
        templateColumns={getTemplateColumns}
        columnGap={columnGap}
        height="45px"
        {...generalRowStyles}
      >
        {options?.selection && (
          <Box
            //
            {...checkboxStyles}
          >
            <Checkbox />
          </Box>
        )}

        {columns.map((col) => (
          <Cell key={col.id} cell={col} {...generalCellStyles} />
        ))}

        {options?.action && (
          <Cell
            cell={{ text: "Action" }}
            minWidth="fit-content"
            {...generalCellStyles}
          />
        )}
      </Grid>
    </Box>
  );
};

const Cell = ({ cell, minWidth = "150px", ...rest }) => {
  return (
    <Box role="cell" minWidth={cell.minWidth || minWidth} {...rest}>
      <Text bold>{cell.text}</Text>
    </Box>
  );
};

export default TableHead;
