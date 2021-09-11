import { Route, Switch } from "react-router-dom";
import { OnBoardingLayoutRoute } from "..";
import Header from "./Header/Header";
import MainArea from "./MainArea";
import Footer from "./Footer";

const UserLayout = () => {
  return (
    <>
      <Header />
      <MainArea />
      <Footer />
    </>
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

export default UserLayoutRouter;
