import { convertToRaw } from "draft-js";

const useRichText = () => {
  const [data, setData] = useState();

  const onChange = (value) => {
    const data = JSON.stringify(convertToRaw(value.getCurrentContent()));
    setData(data);
  };

  return {
    data,
    onChange,
  };
};

export default useRichText;
