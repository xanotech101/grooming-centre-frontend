import { Box, Flex } from "@chakra-ui/layout";
import React from "react";
import { Switch } from "react-router-dom";
import { DashboardPageRoute } from "../../pages/admin/DashboardPage";
import { NotFoundPageRoute } from "../../pages/admin/NotFoundPage";

const MainArea = () => {
  return (
    <Flex backgroundColor="gray.100" p={2} flex={1}>
      <Box as="main" flex={1}>
        <Switch>
          <DashboardPageRoute exact path="/admin" />
          <NotFoundPageRoute />
        </Switch>
      </Box>
    </Flex>
  );
};

export default MainArea;
