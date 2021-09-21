import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useApp } from "../../../../contexts";

export const useIsAuthRedirect = () => {
  const appManager = useApp();
  const { replace } = useHistory();

  useEffect(() => {
    if (!appManager.isAuthenticated) {
      replace("/auth/signin");
    }
  }, [appManager.isAuthenticated, replace]);
};

export const useAuthCheckRedirect = (timeout = 0) => {
  useIsAuthRedirect();

  const appManager = useApp();
  const { replace } = useHistory();

  useEffect(() => {
    const handleRedirect = () => {
      if (appManager.state.user && appManager.state.metadata) {
        const { userRoleId, departmentId } = appManager.state.user;
        const role = appManager.state.metadata.userRoles.find(
          (role) => role.id === userRoleId
        );

        if (!/admin/i.test(role?.name)) {
          console.log("1", role);
          return replace("/");
        }
        if (departmentId) {
          console.log("2", role);
          return replace("/");
        }

        replace("/admin");
      }
    };

    const timeoutId = setTimeout(handleRedirect, timeout);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [
    appManager.state.user,
    appManager.isAuthenticated,
    appManager.state.metadata,
    replace,
    timeout,
  ]);
};
