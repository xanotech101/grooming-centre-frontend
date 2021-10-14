import { Route } from "react-router-dom";

const Questions = () => {
  return <>Questions</>;
};

export const QuestionsRoute = ({ ...rest }) => {
  return <Route {...rest} render={(props) => <Questions {...props} />} />;
};
