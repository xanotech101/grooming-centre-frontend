import { Box, Grid } from "@chakra-ui/react";
import { HiDotsHorizontal } from "react-icons/hi";
import { Button, Checkbox, Spinner, Text } from "../..";

const TableBody = ({
  rows,
  columns,
  options,
  templateColumns,
  columnGap,
  generalRowStyles,
  generalCellStyles,
  checkboxStyles,
  selectedRows,
  onRowSelect,
}) => {
  const getTemplateColumns = () =>
    `${options?.selection ? "20px " : ""}${templateColumns}${
      options?.action ? " auto" : ""
    }`;

  const handleIsChecked = (rowId) =>
    selectedRows?.find((row) => row.id === rowId) ? true : false;

  const handleCheckboxChange = (rowId) => {
    onRowSelect({ id: rowId });
  };

  return (
    <Box role="thead">
      {rows.data?.map((row) => (
        <Grid
          key={row.id}
          role="row"
          alignItems="center"
          templateColumns={getTemplateColumns}
          columnGap={columnGap}
          height="40px"
          {...generalRowStyles}
        >
          {options?.selection && (
            <Box
              //
              {...checkboxStyles}
            >
              <Checkbox
                isChecked={handleIsChecked(row.id)}
                onChange={handleCheckboxChange.bind(null, row.id)}
              />
            </Box>
          )}

          {columns.map((col) =>
            col.renderContent ? (
              col.renderContent(row[col.key])
            ) : (
              <Cell
                key={col.id}
                cell={col}
                text={row[col.key]}
                {...generalCellStyles}
              />
            )
          )}

          {options?.action && (
            <Cell
              renderText={() => (
                <Button asIcon _hover={{ backgroundColor: "secondary.05" }}>
                  <HiDotsHorizontal />
                </Button>
              )}
              minWidth="fit-content"
              {...generalCellStyles}
            />
          )}
        </Grid>
      ))}

      {(rows.loading || rows.err) && (
        <Grid height="200px" placeItems="center">
          {rows.loading && <Spinner size="md" />}

          {rows.err && (
            <Text color="red.500" as="level1" bold>
              Unavailable Service
            </Text>
          )}
        </Grid>
      )}
    </Box>
  );
};

const Cell = ({ cell, text, minWidth = "150px", renderText, ...rest }) => {
  return (
    <Box role="cell" minWidth={cell?.minWidth || minWidth} {...rest}>
      {renderText ? renderText() : <Text>{text || cell?.text}</Text>}
    </Box>
  );
};

export default TableBody;
