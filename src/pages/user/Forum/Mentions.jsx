import { Route } from "react-router-dom";

const Mentions = () => {
  return <>Mentions</>;
};

export const MentionsRoute = ({ ...rest }) => {
  return <Route {...rest} render={(props) => <Mentions {...props} />} />;
};
