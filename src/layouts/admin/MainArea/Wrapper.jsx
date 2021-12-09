import { Box } from "@chakra-ui/layout";
import PropTypes from "prop-types";

export const AdminMainAreaWrapper = ({ children, ...rest }) => {
  return (
    <Box paddingX={5} paddingY={2} {...rest}>
      {children}
    </Box>
  );
};

AdminMainAreaWrapper.propTypes = {
  children: PropTypes.any,
};
