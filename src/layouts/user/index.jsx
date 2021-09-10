import { Route, Switch } from "react-router-dom";
import { OnBoardingLayoutRoute } from "..";
import Header from "./Header";
import MainArea from "./MainArea";

const UserLayout = () => {
  return (
    <>
      <Header />
      <MainArea />
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
