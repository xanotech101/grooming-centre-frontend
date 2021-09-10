import { Flex } from "@chakra-ui/react";

import { Route } from "react-router-dom";
import Header from "./Header";
import MainArea from "./MainArea";
import Sidebar from "./Sidebar";

const AdminLayout = () => {
  return (
    <Flex flexDirection="column" minHeight="100vh" backgroundColor="gray.100">
      <Header />

      <Flex flexGrow={1}>
        <Sidebar />
        <MainArea />
      </Flex>
    </Flex>
  );
};

export const AdminLayoutRoute = ({ component: Component, ...rest }) => {
  return <Route {...rest} render={(props) => <AdminLayout {...props} />} />;
};
