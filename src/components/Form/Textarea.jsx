import React from "react";
import PropTypes from "prop-types";
import FormGroup, { FormGroupPropTypes } from "./FormGroup";
import { Textarea as Textarea_chakraui } from "@chakra-ui/textarea";

export const Textarea = ({
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
        <Textarea_chakraui
          {...props}
          {...rest}
          value={value}
          onChange={onChange}
        />
      )}
    />
  );
};

Textarea.propTypes = {
  ...FormGroupPropTypes,
  value: PropTypes.string,
  onChange: PropTypes.func,
};
