import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Route } from "react-router-dom";
import { useApp } from "../../../contexts";
import { PageLoaderLayout } from "../../../layouts";

const useAuthRedirect = () => {
  const appManager = useApp();
  const { replace } = useHistory();

  useEffect(() => {
    const handleRedirect = () => {
      if (appManager.state.user) {
        const { userRoleId, departmentId } = appManager.state.user;
        const role = appManager.state.metadata?.userRoles.find(
          (role) => role.id === userRoleId
        );

        if (!/admin/i.test(role?.name)) {
          return replace("/");
        }
        if (departmentId) {
          return replace("/");
        }
        return replace("/admin");
      }
    };

    const timeoutId = setTimeout(handleRedirect, 1000);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [appManager.state.user]);
};

const AuthCheckPage = () => {
  useAuthRedirect();

  return <PageLoaderLayout />;
};

const AuthCheckPageRoute = ({ ...rest }) => {
  return <Route {...rest} render={(props) => <AuthCheckPage {...props} />} />;
};

export default AuthCheckPageRoute;
