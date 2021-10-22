import { Route, Switch } from "react-router-dom";
import { OnBoardingLayoutRoute } from "..";
import Header from "./Header/Header";
import MainArea from "./MainArea";
import Footer from "./Footer";
import { Box } from "@chakra-ui/layout";
import breakpoints from "../../theme/breakpoints";
import {
  useIsAuthenticatedRedirect,
  usePageRefreshAfterLogin,
  useUserIsNewRedirect,
} from "../../hooks";

const UserLayout = () => {
  usePageRefreshAfterLogin();
  useIsAuthenticatedRedirect();
  useUserIsNewRedirect();

  return (
    <Box maxWidth={breakpoints["4k"]} marginX="auto">
      <Header />
      <MainArea />
      <Footer />
    </Box>
  );
};

const UserLayoutRouter = () => {
  return (
    <Switch>
      <OnBoardingLayoutRoute path="/auth" />
      <Route path="/" render={(props) => <UserLayout {...props} />} />
    </Switch>
  );
};

export const UserLayoutRoute = ({ component: Component, ...rest }) => {
  return (
    <Route {...rest} render={(props) => <UserLayoutRouter {...props} />} />
  );
};
