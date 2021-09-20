import { Route } from "react-router-dom";

const AssessmentLayout = () => {
  return <div>Enter</div>;
};

export const AssessmentLayoutRoute = ({ ...rest }) => {
  return (
    <Route {...rest} render={(props) => <AssessmentLayout {...props} />} />
  );
};
