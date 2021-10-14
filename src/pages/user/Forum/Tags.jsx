import { Route } from "react-router-dom";

const Tags = () => {
  return <>Tags</>;
};

export const TagsRoute = ({ ...rest }) => {
  return <Route {...rest} render={(props) => <Tags {...props} />} />;
};
