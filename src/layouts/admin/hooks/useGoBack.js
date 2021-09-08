import { useHistory } from "react-router-dom";

const useGoBack = () => {
  const history = useHistory();

  const handleGoBack = () => {
    history.goBack();
  };

  return handleGoBack;
};

export default useGoBack;
