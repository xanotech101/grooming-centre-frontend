import { Route } from "react-router-dom";

const GradeHistoryPage = () => {
  return "GradeHistoryPage";
};

const GradeHistoryPageRoute = ({ ...rest }) => {
  return (
    <Route {...rest} render={(props) => <GradeHistoryPage {...props} />} />
  );
};

export default GradeHistoryPageRoute;
