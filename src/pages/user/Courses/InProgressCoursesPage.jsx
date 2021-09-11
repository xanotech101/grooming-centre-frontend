import { Route } from "react-router-dom";

const InProgressCoursesPage = () => {
  return <>InProgressCoursesPage</>;
};

const InProgressCoursesPageRoute = ({ ...rest }) => {
  return (
    <Route {...rest} render={(props) => <InProgressCoursesPage {...props} />} />
  );
};

export default InProgressCoursesPageRoute;
