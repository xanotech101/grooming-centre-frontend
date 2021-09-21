import { Flex } from "@chakra-ui/react";
import { useEffect } from "react";
import { Route, useHistory } from "react-router-dom";
import { useApp } from "../../contexts";
import { useIsAuthRedirect } from "../../pages/global";
import Header from "./Header";
import MainArea from "./MainArea";
import Sidebar from "./Sidebar";

const useRedirect = () => {
  const { replace } = useHistory();
  const appManager = useApp();

  useEffect(() => {
    if (appManager.state.user && appManager.state.metadata) {
      const { userRoleId } = appManager.state.user;
      const role = appManager.state.metadata.userRoles.find(
        (role) => role.id === userRoleId
      );

      console.log(
        appManager.state.user.userRoleId,
        appManager.state.metadata.userRoles,
        role?.name
      );

      if (!/admin/i.test(role?.name)) {
        return replace("/not-found");
      }
    }
  }, [
    appManager.state.metadata,
    appManager.state.user,
    appManager.isAuthenticated,
    replace,
  ]);
};

const AdminLayout = () => {
  useRedirect();
  useIsAuthRedirect();

  return (
    <Flex flexDirection="column" minHeight="100vh" backgroundColor="gray.100">
      <Header />

      <Flex flexGrow={1}>
        <Sidebar />
        <MainArea />
      </Flex>
    </Flex>
  );
};

export const AdminLayoutRoute = ({ component: Component, ...rest }) => {
  return <Route {...rest} render={(props) => <AdminLayout {...props} />} />;
};
