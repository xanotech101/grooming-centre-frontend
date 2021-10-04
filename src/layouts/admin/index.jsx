import { Flex } from "@chakra-ui/react";
import { useEffect } from "react";
import { Route, useHistory } from "react-router-dom";
import { useApp } from "../../contexts";
import { useIsAuthRedirect } from "../../hooks/useAuthCheckRedirect";
import breakpoints from "../../theme/breakpoints";
import Header from "./Header";
import MainArea from "./MainArea/MainArea";
import Sidebar from "./Sidebar/Sidebar";

const useRedirect = () => {
  const { replace } = useHistory();
  const appManager = useApp();

  useEffect(() => {
    if (appManager.state.user && appManager.state.metadata) {
      const { userRoleId } = appManager.state.user;
      const role = appManager.getOneMetadata("userRoles", userRoleId);

      if (!/admin/i.test(role?.name)) {
        return replace("/not-found");
      }
    }
  }, [
    appManager,
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
    <Flex
      flexDirection="column"
      height="100vh"
      backgroundColor="gray.100"
      maxWidth={breakpoints["laptop-l"]}
      marginX="auto"
      shadow="0 0 10px 3px rgba(0, 0, 0, .1)"
    >
      <Header />

      <Flex height="100%" overflow="hidden">
        <Sidebar />
        <MainArea />
      </Flex>
    </Flex>
  );
};

export const AdminLayoutRoute = ({ component: Component, ...rest }) => {
  return <Route {...rest} render={(props) => <AdminLayout {...props} />} />;
};
