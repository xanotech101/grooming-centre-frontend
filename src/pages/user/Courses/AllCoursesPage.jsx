import { Route } from "react-router-dom";
import { CoursesGridLayout } from "../../../layouts";

const AllCoursesPage = () => {
  return <CoursesGridLayout />;
};

const AllCoursesPageRoute = ({ ...rest }) => {
  return <Route {...rest} render={(props) => <AllCoursesPage {...props} />} />;
};

export default AllCoursesPageRoute;
