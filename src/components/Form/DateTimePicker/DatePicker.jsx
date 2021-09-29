import PropTypes from "prop-types";
import FormGroup, { FormGroupPropTypes } from "../FormGroup";
import { DatePicker as DatePickerMUI } from "@material-ui/pickers";

export const DatePicker = ({
  id,
  isRequired,
  label,
  value,
  onChange = () => {},
}) => {
  return (
    <FormGroup
      id={id}
      label={label}
      isRequired={isRequired}
      renderControl={() => (
        <DatePickerMUI
          className="date-time-picker"
          value={value}
          onChange={onChange}
        />
      )}
    />
  );
};

DatePicker.propTypes = {
  ...FormGroupPropTypes,
  value: PropTypes.instanceOf(Date),
  onChange: PropTypes.func,
};
