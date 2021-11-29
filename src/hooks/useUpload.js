import { useEffect, useState } from "react";

export const useUpload = ({ previewElementId }) => {
  const initAccept = "image/jpeg, image/png";

  const [accept, setAccept] = useState(initAccept);
  const [file, setFile] = useState(null);
  const [image, setImage] = useState({ url: null });
  const [video, setVideo] = useState({ url: null, duration: null });
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

  useEffect(() => {
    if (video.url) {
      const videoElement = document.getElementById(previewElementId);

      videoElement.ondurationchange = function () {
        setVideo((prev) => ({ ...prev, duration: this.duration }));
      };
    }
  }, [previewElementId, video.url]);

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

  const handleGetFileAndValidate = (label, bypass) => {
    if (!bypass && !image.url && !video.url && !pdf.url)
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
