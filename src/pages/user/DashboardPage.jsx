import { Route } from "react-router-dom";

const DashboardPage = () => {
  return <>DashboardPage</>;
};

export const DashboardPageRoute = ({ ...rest }) => {
  return <Route {...rest} render={(props) => <DashboardPage {...props} />} />;
};
