import { Box } from "@chakra-ui/layout";
import { Route } from "react-router-dom";
import Header from "./Header";
import MainArea from "./MainArea";

const UserInfoPage = () => {
  return (
    <>
      <Header />
      <MainArea />
    </>
  );
};

export const UserInfoPageRoute = ({ ...rest }) => {
  return <Route {...rest} render={(props) => <UserInfoPage {...props} />} />;
};
