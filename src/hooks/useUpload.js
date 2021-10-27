import { useState } from "react";

export const useUpload = () => {
  const initAccept = "image/jpeg, image/png";

  const [accept, setAccept] = useState(initAccept);
  const [file, setFile] = useState(null);
  const [image, setImage] = useState({ url: null });
  const [video, setVideo] = useState({ url: null });
  const [pdf, setPdf] = useState({ url: null });

  const handleFileSelect = (file) => {
    const fileIsAnImage = /(image)/i.test(accept);
    const fileIsAVideo = /(video)/i.test(accept);
    const fileIsPDF = /(pdf)/i.test(accept);

    if (file) {
      if (fileIsAnImage) {
        const url = URL.createObjectURL(file);
        setImage({ url });
      }

      if (fileIsAVideo) {
        const url = URL.createObjectURL(file);
        setVideo({ url });
      }

      if (fileIsPDF) {
        const url = URL.createObjectURL(file);
        setPdf({ url });
      }
    } else {
      setVideo({ url: null });
      setImage({ url: null });
      setPdf({ url: null });
    }

    console.log(file, fileIsPDF);

    setFile(file);
  };

  const handleInitialImageSelect = (url) => {
    setImage({ url });
  };
  const handleInitialVideoSelect = (url) => {
    setVideo({ url });
  };
  const handleInitialPdfSelect = (url) => {
    setPdf({ url });
  };

  const handleAcceptChange = (accept) => setAccept(accept);

  const handleGetFileAndValidate = (label) => {
    if (!image.url && !video.url && !pdf.url)
      throw new Error(`Please upload a ${label}`);

    return file;
  };

  return {
    accept,
    image,
    video,
    pdf,
    file,
    handleFileSelect,
    handleAcceptChange,
    handleGetFileAndValidate,
    handleInitialImageSelect,
    handleInitialVideoSelect,
    handleInitialPdfSelect,
  };
};
