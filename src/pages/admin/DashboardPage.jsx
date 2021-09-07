import { Box, Grid } from "@chakra-ui/layout";
import { Skeleton } from "@chakra-ui/skeleton";
import React from "react";
import { Route } from "react-router-dom";

const DashboardPage = () => {
  return (
    <Grid
      templateColumns="repeat(4, 207px)"
      // justifyContent="space-between"
      gap={5}
    >
      <Skeleton height="228px" rounded="sm" />
      <Skeleton height="228px" rounded="sm" />
      <Skeleton height="228px" rounded="sm" />
      <Skeleton height="228px" rounded="sm" />

      <Skeleton height="228px" rounded="sm" />
      <Skeleton height="228px" rounded="sm" />
      <Skeleton height="228px" rounded="sm" />
      <Skeleton height="228px" rounded="sm" />

      <Skeleton height="228px" rounded="sm" />
      <Skeleton height="228px" rounded="sm" />
      <Skeleton height="228px" rounded="sm" />
      <Skeleton height="228px" rounded="sm" />
    </Grid>
  );
};

export const DashboardPageRoute = ({ component: Component, ...rest }) => {
  return <Route {...rest} render={(props) => <DashboardPage {...props} />} />;
};
