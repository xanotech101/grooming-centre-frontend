import { convertToRaw } from "draft-js";
import { useState } from "react";

export const useRichText = () => {
  const [data, setData] = useState();

  const onChange = (value) => {
    console.log(value);

    const data = JSON.stringify(convertToRaw(value.getCurrentContent()));
    setData(data);
  };

  return {
    data,
    onChange,
  };
};
