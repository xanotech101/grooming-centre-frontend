import { Route } from "react-router-dom";
import { useAuthCheckRedirect } from "..";
import { PageLoaderLayout } from "../../../layouts";

const AuthCheckPage = () => {
  useAuthCheckRedirect(1000);

  return <PageLoaderLayout />;
};

const AuthCheckPageRoute = ({ ...rest }) => {
  return <Route {...rest} render={(props) => <AuthCheckPage {...props} />} />;
};

export default AuthCheckPageRoute;
