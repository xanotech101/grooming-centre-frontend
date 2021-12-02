import { Box, Flex, StackDivider } from "@chakra-ui/layout";
import PropTypes from "prop-types";
import Header from "./Header/Header";
import TableHead from "./TableHead/TableHead";
import TableBody from "./TableBody/TableBody";
import { useState } from "react";
import { Button, Text, Spinner } from "..";
import { AiFillMinusSquare } from "react-icons/ai";
import { BiTrash } from "react-icons/bi";
import breakpoints from "../../theme/breakpoints";
import { useFetch } from "../../hooks";
import { capitalizeFirstLetter } from "../../utils";
import { useToast } from "@chakra-ui/toast";
import { useEffect } from "react";

const useTable = ({ rowsData, setRows, multipleDeleteFetcher }) => {
  const [selectedRows, setSelectedRows] = useState([]);
  const {
    resource: { loading: deletionInProgress },
    handleFetchResource,
  } = useFetch();
  const toastBread = useToast();

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
    const onSuccess = () => {
      const allRows = [...rowsData];

      selectedRows.forEach((row) => {
        const rowIndexInRowsData = allRows.findIndex(({ id }) => id === row.id);
        const rowIsInRowsData = rowIndexInRowsData !== -1;

        // deletes it from `rowsData`
        if (rowIsInRowsData) {
          allRows.splice(rowIndexInRowsData, 1);
        }
      });

      // setRows((prev) => ({
      //   data: {
      //     rows: [],
      //   },
      // }));
      setRows((prev) => ({
        data: {
          ...prev.data,
          rows: allRows,
          showingDocumentsCount: prev.data.showingDocumentsCount
            ? prev.data.showingDocumentsCount - selectedRows.length
            : 0,
        },
      }));

      console.log(allRows);

      handleDeselectAllRows();

      toastBread({
        description: capitalizeFirstLetter("deleted successfully"),
        position: "top",
        status: "success",
      });
    };

    const onError = (err) => {
      toastBread({
        description: capitalizeFirstLetter(err.message),
        position: "top",
        status: "error",
      });
    };

    handleFetchResource({
      fetcher: () => multipleDeleteFetcher(selectedRows),
      onSuccess,
      onError,
    });
  };

  return {
    selectedRows,
    deletionInProgress,
    handleDeselectAllRows,
    handleSelectRowsToggle,
    handleSelectRowToggle,
    handleDeleteRows,
  };
};

export const Table = ({
  rows,
  setRows,
  filterControls,
  SearchBarVisibility,
  columns,
  options,
  templateColumns,
  columnGap = 2,
  generalRowStyles,
  handleFetch,
  // Calc from the width of the aside and margins
  width = "calc(100vw - 270px - 40px)",
  maxWidth = `calc(${breakpoints["laptop"]} + 100px)`,
}) => {
  const manager = useTable({
    rowsData: rows.data?.rows,
    setRows,
    multipleDeleteFetcher: options?.multipleDeleteFetcher,
  });

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

  const [params, setParams] = useState({});
  const [canFilter, setCanFilter] = useState(false);

  useEffect(() => {
    if (!options.pagination) {
      console.log("pagination init");

      handleFetch();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [options.pagination]);

  useEffect(() => {
    console.log(canFilter);

    if (canFilter) {
      console.log("canFilter");
      handleFetch({ params });
      setCanFilter(false);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [canFilter]);

  return (
    <Box>
      <Header
        SearchBarVisibility={SearchBarVisibility}
        filterControls={filterControls}
        setParams={setParams}
        setCanFilter={setCanFilter}
      />

      {manager.deletionInProgress ? (
        <Flex
          width="100%"
          height="100%"
          justifyContent="center"
          alignItems="center"
          backgroundColor="rgba(0,0,0,0.3)"
          position="fixed"
          zIndex="1000"
          top="0"
          left="0"
        >
          <Box
            backgroundColor="white"
            textAlign="center"
            padding={10}
            rounded="md"
            shadow="md"
          >
            <Spinner marginBottom={5} />
            <Text as="level2">Please wait, as this might take a while</Text>
          </Box>
        </Flex>
      ) : (
        <>
          <Box
            paddingTop={3}
            marginTop={3}
            borderTop="1px"
            borderColor="accent.2"
          >
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
                setParams={setParams}
                setCanFilter={setCanFilter}
              />
            </Box>
          </Box>
        </>
      )}
    </Box>
  );
};

Table.propTypes = {
  filterControls: PropTypes.array,
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
        link: PropTypes.func,
        props: PropTypes.object,
        onClick: PropTypes.func,
      })
    ),
    selection: PropTypes.bool,
    multipleDeleteFetcher: PropTypes.func,
  }),
  rows: PropTypes.shape({
    data: PropTypes.shape({
      data: PropTypes.arrayOf(PropTypes.object),
      totalCount: PropTypes.number,
      showingCount: PropTypes.number,
    }),
    loading: PropTypes.bool,
    err: PropTypes.bool,
  }),
  setRows: PropTypes.func.isRequired,
  templateColumns: PropTypes.string,
  columnGap: PropTypes.any,
  generalRowStyles: PropTypes.object,
  width: PropTypes.string,
  handleFetch: PropTypes.func,
};
