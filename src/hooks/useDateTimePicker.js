import { useState } from "react";

export const useDateTimePicker = () => {
  const [value, setValue] = useState(new Date("Invalid Date"));

  const handleChange = (value) => setValue(value);

  const handleGetValueAndValidate = (label) => {
    if (!value || /invalid/i.test(value))
      throw new Error(`${label} is required`);

    return value;
  };

  return { value, handleChange, handleGetValueAndValidate };
};
