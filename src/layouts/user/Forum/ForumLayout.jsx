import { Route } from "react-router-dom";
import { Flex, Box } from "@chakra-ui/layout";
import { Aside, Sidebar } from "./Sidebars";
import Header from "./Header";
import MainArea from "./MainArea";

const ForumLayout = () => {
  return (
    <Flex paddingTop={5}>
      <Sidebar width="300px" />

      <Box flex={1} padding={5} paddingTop={0}>
        <Header marginBottom={5} />

        <Flex>
          <MainArea flex={1} />

          <Aside width="250px" />
        </Flex>
      </Box>
    </Flex>
  );
};

export const ForumLayoutRoute = ({ ...rest }) => {
  return <Route {...rest} render={(props) => <ForumLayout {...props} />} />;
};
