import { Box } from "@chakra-ui/layout";
import PropTypes from "prop-types";
import Header from "./Header/Header";

export const Table = ({ filterControls, sortControl }) => {
  return (
    <Box>
      <Header filterControls={filterControls} sortControl={sortControl} />

      <Box as="table">
        <Box as="thead"></Box>
        <Box as="tbody"></Box>
      </Box>
    </Box>
  );
};

Table.propTypes = {
  filterControls: PropTypes.array,
};
