import React from "react";
import { Route, Switch } from "react-router-dom";
import { OnBoardingLayoutRoute } from "..";

const UserLayout = () => {
  return (
    <>
      User
      <header>header</header>
      <aside>sidebar</aside>
      <main>
        <Switch>
          <Route
            exact
            path="/"
            render={(props) => <div {...props}>Homepage</div>}
          />
          <Route
            exact
            path="/courses"
            render={(props) => <div {...props}>courses</div>}
          />

          <Route render={(props) => <div {...props}>Not found</div>} />
        </Switch>
      </main>
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
