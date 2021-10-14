import { Route } from "react-router-dom";

const AddQuestionPage = () => {
  return <>add question page</>;
};

export const AddQuestionPageRoute = ({ ...rest }) => {
  return <Route {...rest} render={(props) => <AddQuestionPage {...props} />} />;
};
