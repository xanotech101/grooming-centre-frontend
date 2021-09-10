import PropTypes from "prop-types";
import { Checkbox as CheckboxChakraui } from "@chakra-ui/checkbox";

export const Checkbox = ({ id, label, isChecked, ...rest }) => {
  return (
    <CheckboxChakraui
      colorScheme="blackAlpha"
      iconColor="primary.base"
      id={id}
      isChecked={isChecked}
      {...rest}
    >
      {label}
    </CheckboxChakraui>
  );
};

Checkbox.propTypes = {
  id: PropTypes.string,
  isChecked: PropTypes.bool,
};
