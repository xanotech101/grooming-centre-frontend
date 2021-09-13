import { Route } from "react-router-dom";
import { CoursesGridLayout } from "../../../layouts";

const NewCoursesPage = () => {
  return <CoursesGridLayout />;
};

const NewCoursesPageRoute = ({ ...rest }) => {
  return <Route {...rest} render={(props) => <NewCoursesPage {...props} />} />;
};

export default NewCoursesPageRoute;
