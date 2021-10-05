import { Route } from "react-router-dom";
import { CoursesGridLayout } from "../../../layouts";
import useCourses from "./hooks/useCourses";

const InProgressCoursesPage = () => {
  const { courses } = useCourses();

  return <CoursesGridLayout courses={courses} />;
};

const InProgressCoursesPageRoute = ({ ...rest }) => {
  return (
    <Route {...rest} render={(props) => <InProgressCoursesPage {...props} />} />
  );
};

export default InProgressCoursesPageRoute;
