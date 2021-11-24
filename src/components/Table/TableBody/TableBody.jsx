import { useToast } from "@chakra-ui/toast";
import { Box, Grid } from "@chakra-ui/react";
import { Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/menu";
import { HiDotsHorizontal } from "react-icons/hi";
import { Checkbox, Spinner, Text } from "../..";
import { Link } from "react-router-dom";
import { DeleteMenuItemButton } from "../../Cards/QuestionListCard";
import { useFetch } from "../../../hooks";
import { useEffect } from "react";
import { capitalizeFirstLetter } from "../../../utils";

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
              <Box key={col.id} {...generalCellStyles}>
                {col.renderContent(row[col.key])}
              </Box>
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
                <ActionIconButton
                  options={options.action}
                  row={row}
                  onRowSelect={onRowSelect}
                />
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

const ActionIconButton = ({ options, row, onRowSelect }) => {
  const { resource: deleteStatus, handleFetchResource } = useFetch();

  const handleDelete = async (fetcher, onClose) => {
    const onSuccess = () => {
      onClose();

      // delete row
      onRowSelect({ id: row.id });
      // Hack
      setTimeout(
        () => document.querySelector('[data-testid="delete"]')?.click(),
        500
      );
    };

    await handleFetchResource({
      fetcher: () => fetcher(row),
      onSuccess,
    });
  };

  const toastBread = useToast();

  useEffect(() => {
    if (deleteStatus.err) {
      toastBread({
        description: capitalizeFirstLetter(deleteStatus.err),
        position: "top",
        status: "error",
      });
    }
  }, [deleteStatus.err, toastBread]);

  return (
    <Menu placement="bottom-end">
      <MenuButton
        padding={2}
        rounded="full"
        _hover={{
          background: "none",
          color: "others.3",
        }}
        _focus={{ border: "none", background: "white" }}
      >
        <HiDotsHorizontal />
      </MenuButton>

      <MenuList position="relative" zIndex={2}>
        {Array.isArray(options) &&
          options.map((opt, index) =>
            opt.isDelete ? (
              <DeleteMenuItemButton
                key={index}
                onDelete={({ onClose }) =>
                  handleDelete(opt.deleteFetcher, onClose)
                }
                deleteStatusIsLoading={deleteStatus.loading}
              />
            ) : (
              <MenuItem
                key={index}
                as={opt.link && Link}
                to={opt.link?.(row)}
                onClick={opt.onClick}
                {...opt.props}
              >
                {opt.text}
              </MenuItem>
            )
          )}
      </MenuList>
    </Menu>
  );
};

const Cell = ({ cell, text, minWidth = "150px", renderText, ...rest }) => {
  return (
    <Box role="cell" minWidth={cell?.minWidth || minWidth} {...rest}>
      {renderText ? (
        renderText()
      ) : (
        <Text>{text !== undefined ? text : cell?.text}</Text>
      )}
    </Box>
  );
};

export default TableBody;
