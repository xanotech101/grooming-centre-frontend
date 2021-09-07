import React from "react";
import PropTypes from "prop-types";
import FormGroup, { FormGroupPropTypes } from "./FormGroup";
import { Input as InputChakraui } from "@chakra-ui/input";

export const Input = ({
  id,
  isRequired,
  label,
  value,
  onChange = () => {},
  ...rest
}) => {
  return (
    <FormGroup
      id={id}
      label={label}
      isRequired={isRequired}
      renderControl={(props) => (
        <InputChakraui {...props} {...rest} value={value} onChange={onChange} />
      )}
    />
  );
};

Input.propTypes = {
  ...FormGroupPropTypes,
  value: PropTypes.string,
  onChange: PropTypes.func,
};
