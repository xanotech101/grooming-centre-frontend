import { Spinner as SpinnerChakraUi } from "@chakra-ui/spinner";
import PropTypes from "prop-types";

export const Spinner = ({ size = "xl" }) => {
  return <SpinnerChakraUi size={size} />;
};

Spinner.propTypes = {
  size: PropTypes.string,
};
