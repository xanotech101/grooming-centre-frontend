import { Route } from "react-router-dom";
import { CoursesGridLayout } from "../../../layouts";
import useCourses from "./hooks/useCourses";

const CompletedCoursesPage = () => {
  const { courses } = useCourses();

  return <CoursesGridLayout courses={courses} />;
};

const CompletedCoursesPageRoute = ({ ...rest }) => {
  return (
    <Route {...rest} render={(props) => <CompletedCoursesPage {...props} />} />
  );
};

export default CompletedCoursesPageRoute;
