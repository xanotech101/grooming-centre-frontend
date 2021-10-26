import { convertToRaw } from "draft-js";
import { useState } from "react";

export const useRichText = () => {
  const [data, setData] = useState({ stringified: null, raw: null });

  const handleChange = (value) => {
    const raw = convertToRaw(value.getCurrentContent());
    const stringified = JSON.stringify(raw);

    setData({ stringified, raw });
  };

  const handleGetValueAndValidate = (label) => {
    const hasValue = data.raw.blocks.reduce(
      (prev, block) => prev + block.text,
      ""
    );
    if (!hasValue) throw new Error(`${label} is required`);

    return data.stringified;
  };

  return {
    data,
    handleChange,
    handleGetValueAndValidate,
  };
};
