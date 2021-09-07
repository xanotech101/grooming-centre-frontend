import PropTypes from "prop-types";
import React, { useState } from "react";
// import DateTimePicker from "@";

export const DatePicker = () => {
  const [value, onChange] = useState(new Date());

  return "<DateTimePicker onChange={onChange} value={value} />";
};

DatePicker.propTypes = {};
