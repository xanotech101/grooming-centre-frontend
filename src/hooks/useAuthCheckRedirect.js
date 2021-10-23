import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useApp } from "../contexts";

export const useRedirectNonAuthUserToSigninPage = () => {
  const appManager = useApp();
  const { replace } = useHistory();

  useEffect(() => {
    if (!appManager.isAuthenticated) {
      replace("/auth/signin");
    }
  }, [appManager.isAuthenticated, replace]);
};

export const useRedirectAuthUserToRoleScreens = (timeout = 0) => {
  useRedirectNonAuthUserToSigninPage();

  const appManager = useApp();
  const { replace } = useHistory();

  useEffect(() => {
    const handleRedirect = () => {
      if (appManager.state.user && appManager.state.metadata) {
        const { userRoleId, departmentId } = appManager.state.user;
        const role = appManager.getOneMetadata("userRoles", userRoleId);

        if (!/admin/i.test(role?.name)) {
          return replace("/");
        }
        if (departmentId) {
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
    appManager,
    appManager.state.user,
    appManager.isAuthenticated,
    appManager.state.metadata,
    replace,
    timeout,
  ]);
};

export const useRedirectNewUserToNewPasswordPage = () => {
  const appManager = useApp();
  const { replace } = useHistory();

  useEffect(() => {
    if (appManager.state.user?.isInviteActive) {
      replace("/auth/new-password");
    }
  }, [appManager.state.user?.isInviteActive, replace]);
};

export const useBlockAuthenticatedUserFromPage = () =>
  // { pardonNewUser }
  {
    const { replace } = useHistory();

    const appManager = useApp();

    // pardonNewUser =
    //   pardonNewUser &&
    //   appManager.isAuthenticated &&
    //   appManager.state.user.isInviteActive;

    useEffect(() => {
      // if (pardonNewUser) {
      //   return;
      // }

      if (appManager.isAuthenticated) {
        replace("/courses");
      }
    }, [appManager.isAuthenticated, replace]);
  };
