import { Box } from "@chakra-ui/layout";
import { Route } from "react-router-dom";
import { Switch } from "react-router-dom";

const MainArea = () => {
  return (
    <Box as="main" padding={5}>
      <Switch>
        <Route
          exact
          path="/"
          render={(props) => <div {...props}>Homepage</div>}
        />
        <Route
          exact
          path="/courses"
          render={(props) => <div {...props}>courses</div>}
        />

        <Route render={(props) => <div {...props}>Not found</div>} />
      </Switch>
    </Box>
  );
};

export default MainArea;
