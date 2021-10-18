import { useEffect } from "react";

export const usePageRefreshAfterLogin = () => {
  const refresh = window.localStorage.getItem("refresh");

  if (refresh === null) {
    window.location.reload();
    window.localStorage.setItem("refresh", "1");
  }
};

export const useRemoveRefresh = () => {
  useEffect(() => {
    localStorage.removeItem("refresh");
  }, []);
};
