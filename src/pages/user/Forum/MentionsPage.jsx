import { Route } from "react-router-dom";

const MentionsPage = () => {
  return <>MentionsPage</>;
};

export const MentionsPageRoute = ({ ...rest }) => {
  return <Route {...rest} render={(props) => <MentionsPage {...props} />} />;
};
