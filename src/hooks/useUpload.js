import { useState } from "react";

export const useUpload = (props) => {
  const initAccept = props?.initAccept || "image/jpeg, image/png";

  const [accept, setAccept] = useState(initAccept);
  const [file, setFile] = useState();
  const [image, setImage] = useState({ url: null });

  const handleFileSelect = (file) => {
    const url = URL.createObjectURL(file);

    setImage({ url });
    setFile(file);
  };
  const handleAcceptChange = (accept) => setAccept(accept);

  const handleGetFileAndValidate = (label) => {
    if (!file) throw new Error(`Please upload a ${label}`);

    return file;
  };

  return {
    accept,
    image,
    file,
    handleFileSelect,
    handleAcceptChange,
    handleGetFileAndValidate,
  };
};
