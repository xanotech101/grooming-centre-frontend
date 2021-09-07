import { Box, Flex } from "@chakra-ui/layout";
import React from "react";
import { Switch } from "react-router-dom";
import {
  CoursesPageRoute,
  CreateCoursePageRoute,
  DashboardPageRoute,
  NotFoundPageRoute,
} from "../../pages/admin";

const MainArea = () => {
  return (
    <Flex
      flexDirection="column"
      backgroundColor="gray.100"
      paddingX={5}
      paddingY={2}
      flex={1}
    >
      <Box as="main" flex={1} flexBasis="1px" overflowY="auto">
        <Switch>
          <DashboardPageRoute exact path="/admin" />
          <CoursesPageRoute exact path="/admin/courses" />
          <CreateCoursePageRoute exact path="/admin/courses/create" />
          <NotFoundPageRoute />
        </Switch>
      </Box>
    </Flex>
  );
};

export default MainArea;
