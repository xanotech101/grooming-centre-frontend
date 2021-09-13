import { Box } from "@chakra-ui/react";
import { Route } from "react-router-dom";

const DashboardPage = () => {
  return <Box>DashboardPage</Box>;
};

export const DashboardPageRoute = ({ ...rest }) => {
  return <Route {...rest} render={(props) => <DashboardPage {...props} />} />;
};
