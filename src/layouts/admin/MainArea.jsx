import { Box, Flex } from "@chakra-ui/layout";
import React from "react";
import { Switch } from "react-router-dom";
import { DashboardPageRoute, NotFoundPageRoute } from "../../pages/admin";

const MainArea = () => {
  return (
    <Flex
      flexDir="column"
      backgroundColor="gray.100"
      padding={2}
      paddingRight={0}
      flex={1}
    >
      <Box as="main" flex={1} flexBasis="1px" overflowY="auto">
        <Box paddingBottom={10}>
          <Switch>
            <DashboardPageRoute exact path="/admin" />
            <NotFoundPageRoute />
          </Switch>
        </Box>
      </Box>
    </Flex>
  );
};

export default MainArea;
