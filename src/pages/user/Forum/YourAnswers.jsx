import { Route } from "react-router-dom";

const YourAnswers = () => {
  return <>YourAnswers</>;
};

export const YourAnswersRoute = ({ ...rest }) => {
  return <Route {...rest} render={(props) => <YourAnswers {...props} />} />;
};
