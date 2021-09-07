import React from "react";
import { Route } from "react-router-dom";

const UserLayout = () => {
  return (
    <>
      User
      <header>header</header>
      <aside>sidebar</aside>
      <main>main area</main>
    </>
  );
};

export const UserLayoutRoute = ({ component: Component, ...rest }) => {
  return <Route {...rest} render={(props) => <UserLayout {...props} />} />;
};

export default UserLayout;
