import { Route } from "react-router-dom";

const CoursesPage = () => {
  return <>Courses</>;
};

export const CoursesPageRoute = ({ ...rest }) => {
  return <Route {...rest} render={(props) => <CoursesPage {...props} />} />;
};
