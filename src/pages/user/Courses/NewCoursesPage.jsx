import { Route } from "react-router-dom";

const NewCoursesPage = () => {
  return <>NewCoursesPage</>;
};

const NewCoursesPageRoute = ({ ...rest }) => {
  return <Route {...rest} render={(props) => <NewCoursesPage {...props} />} />;
};

export default NewCoursesPageRoute;
