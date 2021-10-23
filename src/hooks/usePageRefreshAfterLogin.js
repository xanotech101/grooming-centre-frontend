import { useEffect } from "react";
import { useApp } from "../contexts";

/**
 * Refresh the page after first login
 * Use this hook in pages that the signin page redirects to after successful login.
 */
export const usePageRefreshAfterLogin = () => {
  const appManager = useApp();

  const handler = () => {
    const refresh = window.localStorage.getItem("refresh");

    if (refresh === null) {
      window.location.reload();
      window.localStorage.setItem("refresh", "1");
    }
  };

  useEffect(() => {
    if (appManager.isAuthenticated) {
      handler();
    }
  }, [appManager.isAuthenticated]);
};

export const useRemoveRefresh = () => {
  const appManager = useApp();

  useEffect(() => {
    if (!appManager.isAuthenticated) {
      localStorage.removeItem("refresh");
    }
  }, [appManager.isAuthenticated]);
};
