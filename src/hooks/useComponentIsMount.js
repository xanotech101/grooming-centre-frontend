import { useEffect, useState } from "react";

const useComponentIsMount = () => {
  const [componentIsMount, setComponentIsMount] = useState(true);

  useEffect(() => {
    return () => {
      setComponentIsMount(false);
    };
  }, []);

  return componentIsMount;
};

export default useComponentIsMount;
