import { Route } from "react-router-dom";

const UserInfoPage = () => {
  return "User info";
};

export const UserInfoPageRoute = ({ ...rest }) => {
  return <Route {...rest} render={(props) => <UserInfoPage {...props} />} />;
};
