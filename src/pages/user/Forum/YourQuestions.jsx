import { Route } from "react-router-dom";

const YourQuestions = () => {
  return <>YourQuestions</>;
};

export const YourQuestionsRoute = ({ ...rest }) => {
  return <Route {...rest} render={(props) => <YourQuestions {...props} />} />;
};
