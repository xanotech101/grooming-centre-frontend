import { Route } from "react-router-dom";

const CompletedCoursesPage = () => {
  return <>CompletedCoursesPage</>;
};

const CompletedCoursesPageRoute = ({ ...rest }) => {
  return (
    <Route {...rest} render={(props) => <CompletedCoursesPage {...props} />} />
  );
};

export default CompletedCoursesPageRoute;
