import { Route } from "react-router-dom";
import { CoursesGridLayout } from "../../../layouts";

const InProgressCoursesPage = () => {
  return <CoursesGridLayout />;
};

const InProgressCoursesPageRoute = ({ ...rest }) => {
  return (
    <Route {...rest} render={(props) => <InProgressCoursesPage {...props} />} />
  );
};

export default InProgressCoursesPageRoute;
