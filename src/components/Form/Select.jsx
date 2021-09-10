import PropTypes from "prop-types";
import FormGroup, { FormGroupPropTypes } from "./FormGroup";
import { Select as SelectChakraui } from "@chakra-ui/select";

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
        <SelectChakraui {...props} {...rest} value={value} onChange={onChange}>
          <option></option>

          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </SelectChakraui>
      )}
    />
  );
};

Select.propTypes = {
  ...FormGroupPropTypes,
  value: PropTypes.string,
  options: PropTypes.arrayOf(
    PropTypes.shape({ label: PropTypes.string, value: PropTypes.string })
  ),
  onChange: PropTypes.func,
};
