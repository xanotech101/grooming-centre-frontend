import { Box, Grid } from "@chakra-ui/layout";
import React from "react";
import { Route } from "react-router-dom";

const DashboardPage = () => {
  return (
    <Grid templateColumns="repeat(4, 1fr)">
      <Box backgroundColor="gray.400" height="100px">
        course
      </Box>
      <Box backgroundColor="gray.400" height="100px">
        course
      </Box>
      <Box backgroundColor="gray.400" height="100px">
        course
      </Box>
      <Box backgroundColor="gray.400" height="100px">
        course
      </Box>

      <Box backgroundColor="gray.400" height="100px">
        course
      </Box>
      <Box backgroundColor="gray.400" height="100px">
        course
      </Box>
      <Box backgroundColor="gray.400" height="100px">
        course
      </Box>
      <Box backgroundColor="gray.400" height="100px">
        course
      </Box>

      <Box backgroundColor="gray.400" height="100px">
        course
      </Box>
      <Box backgroundColor="gray.400" height="100px">
        course
      </Box>
      <Box backgroundColor="gray.400" height="100px">
        course
      </Box>
      <Box backgroundColor="gray.400" height="100px">
        course
      </Box>
    </Grid>
  );
};

export const DashboardPageRoute = ({ component: Component, ...rest }) => {
  return <Route {...rest} render={(props) => <DashboardPage {...props} />} />;
};
