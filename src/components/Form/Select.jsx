import PropTypes from "prop-types";
import FormGroup, { FormGroupPropTypes } from "./FormGroup";
import { Select as SelectChakraui } from "@chakra-ui/select";
import { forwardRef } from "react";

export const Select = forwardRef(
  (
    {
      id,
      isRequired,
      isLoading,
      label,
      options,
      value,
      onChange = () => {},
      ...rest
    },
    ref
  ) => {
    return (
      <FormGroup
        id={id}
        label={label}
        isRequired={isRequired}
        isLoading={isLoading}
        renderControl={(props) => (
          <SelectChakraui
            value={value}
            onChange={onChange}
            ref={ref}
            {...props}
            {...rest}
          >
            <option></option>

            {options?.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </SelectChakraui>
        )}
      />
    );
  }
);

Select.propTypes = {
  ...FormGroupPropTypes,
  value: PropTypes.string,
  options: PropTypes.arrayOf(
    PropTypes.shape({ label: PropTypes.string, value: PropTypes.string })
  ),
  onChange: PropTypes.func,
};
