import React from "react";
import { Route } from "react-router-dom";

const AdminLayout = () => {
  return (
    <>
      <header>header</header>

      <aside>sidebar</aside>

      <main>main area</main>
    </>
  );
};

export const AdminLayoutRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) => (
        <AdminLayout>
          <Component {...props} />
        </AdminLayout>
      )}
    />
  );
};

export default AdminLayout;
