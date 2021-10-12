import PropTypes from "prop-types";
import FormGroup, { FormGroupPropTypes } from "../FormGroup";
import { Input as InputChakraui } from "@chakra-ui/input";
import { forwardRef } from "react";

export const Input = forwardRef(
  (
    { error, id, isRequired, label, value, onChange = () => {}, ...rest },
    ref
  ) => {
    return (
      <FormGroup
        id={id}
        label={label}
        isRequired={isRequired}
        error={error}
        renderControl={(props) => (
          <InputChakraui
            _focus={{
              borderColor: "secondary.1",
            }}
            ref={ref}
            value={value}
            onChange={onChange}
            {...props}
            {...rest}
          />
        )}
      />
    );
  }
);

Input.propTypes = {
  ...FormGroupPropTypes,
  value: PropTypes.string,
  onChange: PropTypes.func,
};
