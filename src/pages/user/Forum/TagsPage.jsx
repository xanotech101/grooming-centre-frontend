import { Route } from "react-router-dom";

const TagsPage = () => {
  return <>TagsPage</>;
};

export const TagsPageRoute = ({ ...rest }) => {
  return <Route {...rest} render={(props) => <TagsPage {...props} />} />;
};
