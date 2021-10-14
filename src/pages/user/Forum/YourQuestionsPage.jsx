import { Route } from "react-router-dom";

const YourQuestionsPage = () => {
  return <>YourQuestionsPage</>;
};

export const YourQuestionsPageRoute = ({ ...rest }) => {
  return (
    <Route {...rest} render={(props) => <YourQuestionsPage {...props} />} />
  );
};
