import { Button, ButtonGroup, IconButton } from "@chakra-ui/button";
import { Input } from "@chakra-ui/input";
import { Box, Flex, Grid } from "@chakra-ui/layout";
import { Skeleton } from "@chakra-ui/skeleton";
import VisuallyHidden from "@chakra-ui/visually-hidden";
import React from "react";
import { BsSearch } from "react-icons/bs";
import { Route } from "react-router-dom";

const DashboardPage = () => {
  return (
    <Box as="section" backgroundColor="white" p={10} paddingBottom={16}>
      <Flex as="header" justifyContent="flex-end" height="170px" mb={5}>
        <ButtonGroup>
          <Button
            backgroundColor="#800020"
            textColor="white"
            _hover={{ opacity: 0.7 }}
          >
            Add Course
          </Button>
          <Button
            backgroundColor="transparent"
            textColor="#800020"
            border="1px"
            _hover={{ opacity: 0.7 }}
          >
            Add Lesson
          </Button>
        </ButtonGroup>
      </Flex>

      <Box mb={5} maxWidth="500px">
        <Flex as="form" border="1px" textColor="gray.400" rounded="md">
          <IconButton
            _focus={{ fontSize: "20px" }}
            variant="ghost"
            width="60px"
          >
            <BsSearch />
          </IconButton>

          <VisuallyHidden as="label">Search Courses</VisuallyHidden>
          <Input
            variant="unstyled"
            placeholder="Search Courses"
            paddingLeft={2}
          />
        </Flex>
      </Box>

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
    </Box>
  );
};

export const DashboardPageRoute = ({ component: Component, ...rest }) => {
  return <Route {...rest} render={(props) => <DashboardPage {...props} />} />;
};
