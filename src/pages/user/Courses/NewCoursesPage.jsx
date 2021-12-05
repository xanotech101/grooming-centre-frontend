import { Route } from "react-router-dom";
import { CoursesGridLayout } from "../../../layouts";
import useCourses from "./hooks/useCourses";

const NewCoursesPage = () => {
  const { courses } = useCourses();

  return <CoursesGridLayout courses={courses} />;
};

const NewCoursesPageRoute = ({ ...rest }) => {
  return <Route {...rest} render={(props) => <NewCoursesPage {...props} />} />;
};

export default NewCoursesPageRoute;
