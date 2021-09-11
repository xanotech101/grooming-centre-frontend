import { Route } from "react-router-dom";

const ForumPage = () => {
  return <>ForumPage</>;
};

export const ForumPageRoute = ({ ...rest }) => {
  return <Route {...rest} render={(props) => <ForumPage {...props} />} />;
};
