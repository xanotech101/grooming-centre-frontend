import PropTypes from "prop-types";
import FormGroup, { FormGroupPropTypes } from "./FormGroup";
import { Select as SelectChakraui } from "@chakra-ui/select";
import { forwardRef } from "react";
import { Box } from "@chakra-ui/layout";

export const Select = forwardRef(
  (
    {
      error,
      id,
      isRequired,
      isLoading,
      label,
      options,
      value,
      placeholder,
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
        error={error}
        renderControl={(props) => (
          <SelectChakraui
            value={value}
            onChange={onChange}
            ref={ref}
            {...props}
            {...rest}
          >
            <Box as="option" color="accent.3">
              {placeholder}
            </Box>

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
