import { Route } from "react-router-dom";

const QuestionsPage = () => {
  return "QuestionsPage";
};

const QuestionsPageRoute = ({ ...rest }) => {
  return <Route {...rest} render={(props) => <QuestionsPage {...props} />} />;
};

export default QuestionsPageRoute;
