import { Route } from "react-router-dom";

const GradeCriteriaPage = () => {
  return "GradeCriteriaPage";
};

export const GradeCriteriaPageRoute = ({ ...rest }) => {
  return <Route {...rest} render={(props) => <GradeCriteriaPage {...props} />} />;
};
