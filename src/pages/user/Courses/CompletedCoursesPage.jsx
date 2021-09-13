import { Route } from "react-router-dom";
import { CoursesGridLayout } from "../../../layouts";

const CompletedCoursesPage = () => {
  return <CoursesGridLayout />;
};

const CompletedCoursesPageRoute = ({ ...rest }) => {
  return (
    <Route {...rest} render={(props) => <CompletedCoursesPage {...props} />} />
  );
};

export default CompletedCoursesPageRoute;
