import { Route } from "react-router-dom";

const AssessmentPage = () => {
  return "AssessmentPage";
};

const AssessmentPageRoute = ({ ...rest }) => {
  return <Route {...rest} render={(props) => <AssessmentPage {...props} />} />;
};

export default AssessmentPageRoute;
