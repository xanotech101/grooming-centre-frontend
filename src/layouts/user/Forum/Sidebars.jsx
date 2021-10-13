import { Box } from "@chakra-ui/react";
import { SearchBar } from "../../../components";

export const Sidebar = ({ ...rest }) => {
  return (
    <Box {...rest}>
      <SearchBar marginBottom={5} />

      <Box as="nav">links</Box>
    </Box>
  );
};

export const Aside = ({ ...rest }) => {
  return (
    <Box
      as="aside"
      shadow="0px 0px 5px rgba(0, 0, 0, 0.1)"
      rounded={5}
      minHeight="300px"
      padding={3}
      {...rest}
    >
      Aside
    </Box>
  );
};
