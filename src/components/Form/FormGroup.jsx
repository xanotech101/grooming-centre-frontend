import { FormControl, FormLabel } from "@chakra-ui/form-control";

import PropTypes from "prop-types";

const FormGroup = ({ id, isRequired, label, renderControl }) => {
  return (
    <FormControl
      id={id}
      isRequired={isRequired}
      display="flex"
      flexDirection="column"
    >
      {label && <FormLabel fontSize="text.level2">{label}</FormLabel>}
      {renderControl({ rounded: "4px", borderColor: "accent.2" })}
    </FormControl>
  );
};

export const FormGroupPropTypes = {
  renderControl: PropTypes.func,
  id: PropTypes.string.isRequired,
  isRequired: PropTypes.bool,
  label: PropTypes.string,
};

FormGroup.propTypes = FormGroupPropTypes;

export default FormGroup;
