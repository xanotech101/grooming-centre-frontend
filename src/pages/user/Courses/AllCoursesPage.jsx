import { Route } from "react-router-dom";
import { CoursesGridLayout } from "../../../layouts";
import useCourses from "./hooks/useCourses";

const AllCoursesPage = () => {
  const { courses } = useCourses();

  return <CoursesGridLayout courses={courses} />;
};

const AllCoursesPageRoute = ({ ...rest }) => {
  return <Route {...rest} render={(props) => <AllCoursesPage {...props} />} />;
};

export default AllCoursesPageRoute;
