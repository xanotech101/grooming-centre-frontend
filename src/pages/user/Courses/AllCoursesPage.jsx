import { Route } from "react-router-dom";

const AllCoursesPage = () => {
  return <>AllCoursesPage</>;
};

const AllCoursesPageRoute = ({ ...rest }) => {
  return <Route {...rest} render={(props) => <AllCoursesPage {...props} />} />;
};

export default AllCoursesPageRoute;
