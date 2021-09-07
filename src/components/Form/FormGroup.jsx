import { FormControl, FormLabel } from "@chakra-ui/form-control";
import React from "react";
import PropTypes from "prop-types";

const FormGroup = ({ id, isRequired, label, renderControl }) => {
  return (
    <FormControl id={id} isRequired={isRequired}>
      {label && <FormLabel>{label}</FormLabel>}
      {renderControl({ rounded: "sm" })}
    </FormControl>
  );
};

export const FormGroupPropTypes = {
  renderControl: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
  isRequired: PropTypes.bool,
  label: PropTypes.string,
};

FormGroup.propTypes = FormGroupPropTypes;

export default FormGroup;
