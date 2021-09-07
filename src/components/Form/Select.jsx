import React from "react";
import PropTypes from "prop-types";
import FormGroup, { FormGroupPropTypes } from "./FormGroup";
import { Select as Select_chakraui } from "@chakra-ui/select";

export const Select = ({
  id,
  isRequired,
  label,
  options,
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
        <Select_chakraui {...props} {...rest} value={value} onChange={onChange}>
          <option></option>

          {options.map((option) => (
            <option value={option.value}>{option.label}</option>
          ))}
        </Select_chakraui>
      )}
    />
  );
};

Select.propTypes = {
  ...FormGroupPropTypes,
  value: PropTypes.string,
  options: PropTypes.arrayOf([
    PropTypes.shape({ label: PropTypes.string, value: PropTypes.string }),
  ]),
  onChange: PropTypes.func,
};
