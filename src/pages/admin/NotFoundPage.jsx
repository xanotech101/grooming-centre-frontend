import { Flex } from "@chakra-ui/react";

import { Route } from "react-router-dom";

const NotFoundPage = () => {
  return <Flex>Page not found</Flex>;
};

export const NotFoundPageRoute = ({ component: Component, ...rest }) => {
  return <Route {...rest} render={(props) => <NotFoundPage {...props} />} />;
};
