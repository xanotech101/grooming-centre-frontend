import { Route } from "react-router-dom";
import { Flex, Box } from "@chakra-ui/layout";
import { Aside, Sidebar } from "./Sidebars";
import Header from "./Header/Header";
import MainArea from "./MainArea";

const ForumLayout = () => {
  return (
    <Flex paddingTop={7}>
      <Sidebar width="250px" />

      <Box flex={1} padding={7} paddingTop={0}>
        <Header marginBottom={7} />

        <Flex overflowY="auto" height="calc(100vh - 170px)">
          <MainArea flex={1} marginRight={7} />

          <Aside
            width="250px"
            alignSelf="flex-start"
            position="sticky"
            top={1}
            margin={1}
          />
        </Flex>
      </Box>
    </Flex>
  );
};

export const ForumLayoutRoute = ({ ...rest }) => {
  return <Route {...rest} render={(props) => <ForumLayout {...props} />} />;
};
