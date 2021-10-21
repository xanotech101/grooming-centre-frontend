import { Route } from "react-router-dom";

const ExamPage = () => {
  return "ExamPage";
};

const ExamPageRoute = ({ ...rest }) => {
  return <Route {...rest} render={(props) => <ExamPage {...props} />} />;
};

export default ExamPageRoute;
