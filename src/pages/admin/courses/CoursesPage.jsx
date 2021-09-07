import { ButtonGroup, IconButton } from "@chakra-ui/button";
import { Input } from "@chakra-ui/input";
import { Box, Flex, Grid } from "@chakra-ui/layout";
import { Skeleton } from "@chakra-ui/skeleton";
import VisuallyHidden from "@chakra-ui/visually-hidden";
import React from "react";
import { BsSearch } from "react-icons/bs";
import { Route } from "react-router-dom";
import { Button } from "../../../components";

export const CoursesPage = () => {
  return (
    <Box
      as="section"
      backgroundColor="white"
      paddingX={10}
      paddingTop={5}
      paddingBottom={10}
    >
      <Flex as="header" justifyContent="flex-end" height="190px" mb={5}>
        <ButtonGroup>
          <Button link="/admin/courses/create">Add Course</Button>

          <Button link="/admin/courses/create-lesson" outline>
            Add Lesson
          </Button>
        </ButtonGroup>
      </Flex>

      <Box>
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
    </Box>
  );
};

export const CoursesPageRoute = ({ component: Component, ...rest }) => {
  return <Route {...rest} render={(props) => <CoursesPage {...props} />} />;
};
