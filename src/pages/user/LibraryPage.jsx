import { Route } from "react-router-dom";

const LibraryPage = () => {
  return <>LibraryPage</>;
};

export const LibraryPageRoute = ({ ...rest }) => {
  return <Route {...rest} render={(props) => <LibraryPage {...props} />} />;
};
