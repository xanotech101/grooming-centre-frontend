import React from "react";
import { Route } from "react-router-dom";
import { CoursesPage } from ".";

// const DashboardPage = () => {
//   return ();
// };

export const DashboardPageRoute = ({ ...rest }) => {
  return <Route {...rest} render={(props) => <CoursesPage {...props} />} />;
};
