import { Route } from "react-router-dom";

const CoursesPage = () => {
  return "CoursesPage";
};

const CoursesPageRoute = ({ ...rest }) => {
  return <Route {...rest} render={(props) => <CoursesPage {...props} />} />;
};

export default CoursesPageRoute;
