import React from "react";
import { Route } from "react-router-dom";

const SigninPage = () => {
  return "Signin";
};

export const SigninPageRoute = ({ ...rest }) => {
  return <Route {...rest} render={(props) => <SigninPage {...props} />} />;
};
