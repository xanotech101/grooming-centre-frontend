import React from "react";
import PropTypes from "prop-types";
import FormGroup, { FormGroupPropTypes } from "./FormGroup";
import { Input as Input_chakraui } from "@chakra-ui/input";

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
        <Input_chakraui
          {...props}
          {...rest}
          value={value}
          onChange={onChange}
        />
      )}
    />
  );
};

Input.propTypes = {
  ...FormGroupPropTypes,
  value: PropTypes.string,
  onChange: PropTypes.func,
};
