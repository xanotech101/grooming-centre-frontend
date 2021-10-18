import { Route } from "react-router-dom";

const LessonPage = () => {
  return "LessonPage";
};

const LessonPageRoute = ({ ...rest }) => {
  return <Route {...rest} render={(props) => <LessonPage {...props} />} />;
};

export default LessonPageRoute;
