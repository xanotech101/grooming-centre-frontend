import { Box, Center, Flex, Grid, GridItem } from "@chakra-ui/layout";
import { useCallback, useEffect } from "react";
import { Doughnut } from "react-chartjs-2";
import { FiUsers } from "react-icons/fi";
import { GiBookshelf } from "react-icons/gi";
// import { IoMdMore } from "react-icons/io";
import { IoCalendarOutline } from "react-icons/io5";
import { Route } from "react-router-dom";
import { useAdminEventsPage } from ".";
import {
  // Button,
  SkeletonText,
  Spinner,
  Text,
} from "../../components";
import { useFetchAndCache } from "../../hooks";
import { AdminMainAreaWrapper } from "../../layouts";
import { adminGetDepartmentListing, adminGetUserListing } from "../../services";
import useCourseListing from "./courses/hooks/useCourseListing";

const useUserListing = () => {
  const { resource: users, handleFetchResource } = useFetchAndCache();

  const fetcher = useCallback(async () => {
    const { users } = await adminGetUserListing();
    return users;
  }, []);

  useEffect(() => {
    handleFetchResource({ cacheKey: "users", fetcher });
  }, [handleFetchResource, fetcher]);

  return {
    users,
  };
};

const useDepartmentListing = () => {
  const { resource: departments, handleFetchResource } = useFetchAndCache();

  const fetcher = useCallback(async () => {
    const { departments } = await adminGetDepartmentListing();
    return departments;
  }, []);

  useEffect(() => {
    handleFetchResource({ cacheKey: "departments", fetcher });
  }, [handleFetchResource, fetcher]);

  return {
    departments,
  };
};

const DashboardPage = () => {
  const { users } = useUserListing();
  const { events } = useAdminEventsPage();
  const { courses } = useCourseListing();
  const { departments } = useDepartmentListing();

  const departmentName = departments.data?.map((department) => department.name);

  const departmentUsers = departments.data?.map(
    (department) => department.noOfusers
  );

  const isPublishedLength = courses?.map((course) => {
    const isPublished = course.isPublished;
    return isPublished;
  });

  const published = isPublishedLength?.filter(function (value) {
    return value === true;
  });

  const getColors = () => {
    const colors = [];

    [...Array(departmentName?.length).keys()].forEach(() => {
      colors.push(`hsl(${Math.random() * 360}, 50%, 50%)`);
    });

    return colors;
  };

  const totalDepartmentChartConfig = {
    data: {
      labels: [...(departmentName || [])],
      datasets: [
        {
          data: [...(departmentUsers || [])],
          backgroundColor: [...getColors()],
          borderWidth: 0,
        },
      ],
    },

    options: {
      plugins: {
        legend: { position: "bottom" },
      },
    },
  };

  return (
    <AdminMainAreaWrapper marginBottom={4}>
      <Grid marginY={4} templateColumns="repeat(3, 1fr)" gap={6}>
        <GridItem>
          <MiniBox
            children={
              users.loading ? (
                <SkeletonText numberOfLines={1} width={100} />
              ) : (
                <Flex>
                  <Text fontSize="heading.h3">{users.data?.length}</Text>
                  <Text color="accent.3" paddingLeft={1} paddingTop={2}>
                    Users
                  </Text>
                </Flex>
              )
            }
            icon={<FiUsers color="white" size="18px" />}
          />
        </GridItem>
        <GridItem>
          <MiniBox
            children={
              users.loading ? (
                <SkeletonText numberOfLines={2} width={100} />
              ) : (
                <Flex flexDirection="column">
                  <Flex>
                    <Text fontSize="heading.h3">{courses?.length}</Text>
                    <Text color="accent.3" paddingLeft={1} paddingTop={2}>
                      Courses
                    </Text>
                  </Flex>
                  <Text>{`${published?.length} published.`}</Text>
                </Flex>
              )
            }
            icon={<GiBookshelf color="white" size="18px" />}
          />
        </GridItem>
        <GridItem>
          <MiniBox
            children={
              users.loading ? (
                <SkeletonText numberOfLines={1} width={100} />
              ) : (
                <Flex>
                  <Text fontSize="heading.h3">{events?.length}</Text>
                  <Text color="accent.3" paddingLeft={1} paddingTop={2}>
                    Events
                  </Text>
                </Flex>
              )
            }
            icon={<IoCalendarOutline color="white" size="18px" />}
          />
        </GridItem>
      </Grid>
      <Box
        boxShadow="0px 1px 30px rgba(63, 63, 68, 0.05)"
        backgroundColor="white"
        width="50%"
        height="500px"
      >
        <Flex justifyContent="space-between" padding={4}>
          <Text fontSize="heading.h3" bold>
            Statistics
          </Text>
          {/* <Button asIcon>
            <IoMdMore />
          </Button> */}
        </Flex>
        <Flex justifyContent="center">
          <Box width="350px" height="350px">
            <Center paddingY={4}>
              <Text fontSize="heading.h4">Users by departments</Text>
            </Center>
            {departmentName ? (
              <Doughnut {...totalDepartmentChartConfig} />
            ) : (
              <Flex height="100%" justifyContent="center" align="center">
                <Spinner />
              </Flex>
            )}
          </Box>
        </Flex>
      </Box>
    </AdminMainAreaWrapper>
  );
};

const MiniBox = ({ children, icon }) => {
  return (
    <Flex
      justifyContent="space-between"
      boxShadow="0px 1px 30px rgba(63, 63, 68, 0.05)"
      backgroundColor="white"
      padding={6}
    >
      {children}
      <Flex
        backgroundColor="secondary.5"
        borderRadius="50%"
        width={16}
        height={16}
        justifyContent="center"
        alignItems="center"
      >
        {icon}
      </Flex>
    </Flex>
  );
};

export const DashboardPageRoute = ({ ...rest }) => {
  return <Route {...rest} render={(props) => <DashboardPage {...props} />} />;
};
