import { Box, Flex } from "@chakra-ui/react";
import { useEffect } from "react";
import { Route, useHistory } from "react-router-dom";
import { useApp } from "../../contexts";
import {
  useRedirectNonAuthUserToSigninPage,
  usePageRefreshAfterLogin,
  useRedirectNewUserToNewPasswordPage,
} from "../../hooks";
import breakpoints from "../../theme/breakpoints";
import Footer from "../user/Footer";
import Header from "./Header";
import MainArea from "./MainArea/MainArea";
import Sidebar from "./Sidebar/Sidebar";
import Sidebar2 from "./Sidebar/SideBar2";
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
  usePageRefreshAfterLogin();
  useRedirect();
  useRedirectNonAuthUserToSigninPage();
  useRedirectNewUserToNewPasswordPage();

  const isSettingsPage = /settings/i.test(window.location.pathname);

  return (
   <Box  backgroundColor={isSettingsPage ? "white" : "gray.100"} minH="100vh">

       <Sidebar2/>
        <MainArea />
         {isSettingsPage ? <Footer /> : null}
      </Box>
     
  );
};

export const AdminLayoutRoute = ({ component: Component, ...rest }) => {
  return <Route {...rest} render={(props) => <AdminLayout {...props} />} />;
};
