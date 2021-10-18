import { Route } from "react-router-dom";

const YourAnswersPage = () => {
  return <>YourAnswersPage</>;
};

export const YourAnswersPageRoute = ({ ...rest }) => {
  return <Route {...rest} render={(props) => <YourAnswersPage {...props} />} />;
};
