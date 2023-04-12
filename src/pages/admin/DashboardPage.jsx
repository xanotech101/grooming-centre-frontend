import { Box, Center, Flex, Grid, GridItem } from '@chakra-ui/layout';
import { useCallback, useEffect } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { FiUsers } from 'react-icons/fi';
import { GiBookshelf, GiSpellBook } from 'react-icons/gi';
// import { IoMdMore } from "react-icons/io";
import { IoCalendarOutline } from 'react-icons/io5';
import { Route } from 'react-router-dom';
import { useAdminEventsPage } from '.';
import {
  // Button,
  SkeletonText,
  Text,
} from '../../components';
import { useFetchAndCache } from '../../hooks';
import { AdminMainAreaWrapper } from '../../layouts';
import {
  adminGetDepartmentListing,
  adminGetRoleListing,
  adminGetUserListing,
  adminLibraryListing,
} from '../../services';
import useCourseListing from './courses/hooks/useCourseListing';
import Carousel from 'react-elastic-carousel';
import { MdVideoLibrary } from 'react-icons/md';
import { FaRegFileAudio } from 'react-icons/fa';
import { SkeletonCircle } from '@chakra-ui/skeleton';
import colors from '../../theme/colors';

const useUserListing = () => {
  const { resource: users, handleFetchResource } = useFetchAndCache();

  const fetcher = useCallback(async () => {
    const { users } = await adminGetUserListing();
    return users;
  }, []);

  useEffect(() => {
    handleFetchResource({ cacheKey: 'users', fetcher });
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
    handleFetchResource({ cacheKey: 'departments', fetcher });
  }, [handleFetchResource, fetcher]);

  return {
    departments,
  };
};

const useRoleListing = () => {
  const { resource: roles, handleFetchResource } = useFetchAndCache();

  const fetcher = useCallback(async () => {
    const { roles } = await adminGetRoleListing();
    return roles;
  }, []);

  useEffect(() => {
    handleFetchResource({ cacheKey: 'roles', fetcher });
  }, [handleFetchResource, fetcher]);

  return {
    roles,
  };
};

const useLibraryListing = () => {
  const { resource: library, handleFetchResource } = useFetchAndCache();

  const fetcher = useCallback(async () => {
    const { library } = await adminLibraryListing();
    return library;
  }, []);

  useEffect(() => {
    handleFetchResource({ cacheKey: 'library', fetcher });
  }, [handleFetchResource, fetcher]);

  return {
    library,
  };
};

const DashboardPage = () => {
  const { users } = useUserListing();
  const { events, isLoading: eventsIsLoading } = useAdminEventsPage();
  const { courses, isLoading: courseIsLoading } = useCourseListing();
  const { departments } = useDepartmentListing();
  const { roles } = useRoleListing();
  const { library } = useLibraryListing();

  // get uploaded library books
  const isPdf = library.data?.map((lib) => lib.fileType === 'pdf');
  const books = isPdf?.filter(function (value) {
    return value === true;
  });

  // get uploaded library videos
  const isVideo = library.data?.map((lib) => lib.fileType === 'video');
  const videos = isVideo?.filter(function (value) {
    return value === true;
  });

  // get uploaded library audio files
  const isAudio = library.data?.map((lib) => lib.fileType === 'audio');
  const audio = isAudio?.filter(function (value) {
    return value === true;
  });

  const departmentName = departments.data?.map((department) => department.name);

  const departmentUsers = departments.data?.map(
    (department) => department.noOfusers
  );

  const roleName = roles.data?.map((role) => role.name);

  const roleUsers = roles.data?.map((role) => role.noOfUsers);

  // get published courses
  const isPublishedLength = courses?.map((course) => {
    const isPublished = course.isPublished;
    return isPublished;
  });

  const published = isPublishedLength?.filter(function (value) {
    return value === true;
  });

  // randomize colors
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
        legend: { position: 'bottom' },
      },
    },
  };

  const totalRoleChartConfig = {
    data: {
      labels: [...(roleName || [])],
      datasets: [
        {
          data: [...(roleUsers || [])],
          backgroundColor: [
            colors.primary.base,
            colors.secondary['4'],
            colors.accent['7'],
          ],
          borderWidth: 0,
        },
      ],
    },

    options: {
      plugins: {
        legend: { position: 'bottom' },
      },
    },
  };

  return (
    <AdminMainAreaWrapper
      marginBottom={4}
      marginRight={{ lg: '5', md: '5', sm: '5' }}
    >
      <Grid
        marginY={4}
        templateColumns={{ lg: 'repeat(3, 1fr)', sm: null, md: '1fr' }}
        gap={6}
      >
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
            iconBackgroundColor={users.loading ? 'none' : 'secondary.5'}
            icon={
              users.loading ? (
                <SkeletonCircle />
              ) : (
                <FiUsers color="white" size="18px" />
              )
            }
          />
        </GridItem>
        <GridItem>
          <MiniBox
            children={
              courseIsLoading ? (
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
            iconBackgroundColor={courseIsLoading ? 'none' : 'secondary.5'}
            icon={
              courseIsLoading ? (
                <SkeletonCircle />
              ) : (
                <GiBookshelf color="white" size="18px" />
              )
            }
          />
        </GridItem>
        <GridItem>
          <MiniBox
            children={
              eventsIsLoading ? (
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
            iconBackgroundColor={eventsIsLoading ? 'none' : 'secondary.5'}
            icon={
              eventsIsLoading ? (
                <SkeletonCircle />
              ) : (
                <IoCalendarOutline color="white" size="18px" />
              )
            }
          />
        </GridItem>
      </Grid>
      <Flex
        flexDirection={{ base: 'column', md: 'column', lg: 'row' }}
        rowGap={5}
      >
        <Box
          boxShadow="0px 1px 30px rgba(63, 63, 68, 0.05)"
          backgroundColor="white"
          width={{ sm: '100%', md: '100%', lg: '50%' }}
          // height="600px"
          paddingY={4}
          paddingX={6}
        >
          <Flex
            justifyContent="space-between"
            flexDirection={{ sm: 'column', md: 'column', lg: 'row' }}
          >
            {departmentName ? (
              <Text fontSize="heading.h3" bold>
                Statistics
              </Text>
            ) : (
              <SkeletonText numberOfLines={1} width={40} />
            )}

            {/* <Button asIcon>
            <IoMdMore />
          </Button> */}
          </Flex>
          <Carousel
            itemsToShow={1}
            easing="cubic-bezier(1,.15,.55,1.54)"
            tiltEasing="cubic-bezier(0.110, 1, 1.000, 0.210)"
            transitionMs={700}
            className="carousel"
          >
            <Box height="100%">
              <Flex justifyContent="center">
                <Box width="350px" height="100%">
                  <Center paddingY={4}>
                    {departmentName ? (
                      <Text fontSize="heading.h4">Users by departments</Text>
                    ) : (
                      <SkeletonText numberOfLines={1} width={300} />
                    )}
                  </Center>
                  {departmentName ? (
                    <Doughnut {...totalDepartmentChartConfig} />
                  ) : (
                    <Flex height="350px" justifyContent="center" align="center">
                      <SkeletonCircle width="300px" height="300px" />
                    </Flex>
                  )}
                </Box>
              </Flex>
            </Box>
            <Box height="100%">
              <Flex justifyContent="center">
                <Box width="350px" height="100%">
                  <Center paddingY={4}>
                    {roleName ? (
                      <Text fontSize="heading.h4">Users by roles</Text>
                    ) : (
                      <SkeletonText numberOfLines={1} width={300} />
                    )}
                  </Center>
                  {roleName ? (
                    <Doughnut {...totalRoleChartConfig} />
                  ) : (
                    <Flex height="350px" justifyContent="center" align="center">
                      <SkeletonCircle width="300px" height="300px" />
                    </Flex>
                  )}
                </Box>
              </Flex>
            </Box>
          </Carousel>
        </Box>

        <Box
          boxShadow="0px 1px 30px rgba(63, 63, 68, 0.05)"
          backgroundColor="white"
          width={{ lg: '50%', sm: '100%', md: '100%' }}
          // height="600px"
          paddingY={4}
          paddingX={6}
          marginLeft={{ lg: 3, sm: 0, md: 0 }}
          marginTop={{ lg: 0, sm: 5, md: 5 }}
        >
          <Flex
            paddingBottom={4}
            justifyContent="space-between"
            flexDirection={{ sm: 'column', md: 'column', lg: 'row' }}
          >
            {library.loading ? (
              <SkeletonText numberOfLines={1} width={40} />
            ) : (
              <Text fontSize="heading.h3" bold>
                Library
              </Text>
            )}
            {/* <Button asIcon>
            <IoMdMore />
          </Button> */}
          </Flex>
          <Flex flexDirection="column">
            <Box
              boxShadow="0px 1px 30px rgba(63, 63, 68, 0.05)"
              backgroundColor="white"
              height="130px"
              padding={6}
              marginBottom={4}
              border="1px solid #ccc"
              borderRadius={5}
              display="flex"
              flexDirection="column"
              justifyContent="center"
            >
              {library.loading ? (
                <Flex justifyContent="space-between">
                  <SkeletonText numberOfLines={2} width={40} />
                  <SkeletonCircle />
                </Flex>
              ) : (
                <Flex justifyContent="space-between">
                  <Flex flexDirection="column">
                    <Text color="accent.3" fontSize="text.level2" bold>
                      Videos
                    </Text>
                    <Text fontSize="text.level1">
                      {`${videos?.length} uploaded resources`}
                    </Text>
                  </Flex>
                  <MdVideoLibrary color="#BD1F46" size="32px" />
                </Flex>
              )}
            </Box>
            <Box
              boxShadow="0px 1px 30px rgba(63, 63, 68, 0.05)"
              backgroundColor="white"
              height="130px"
              padding={6}
              marginBottom={4}
              border="1px solid #ccc"
              borderRadius={5}
              display="flex"
              flexDirection="column"
              justifyContent="center"
            >
              {library.loading ? (
                <Flex justifyContent="space-between">
                  <SkeletonText numberOfLines={2} width={40} />
                  <SkeletonCircle />
                </Flex>
              ) : (
                <Flex justifyContent="space-between">
                  <Flex flexDirection="column">
                    <Text color="accent.3" fontSize="text.level2" bold>
                      Books
                    </Text>
                    <Text fontSize="text.level1">{`${books?.length} uploaded resources`}</Text>
                  </Flex>
                  <GiSpellBook color="#BD1F46" size="32px" />
                </Flex>
              )}
            </Box>
            <Box
              boxShadow="0px 1px 30px rgba(63, 63, 68, 0.05)"
              backgroundColor="white"
              height="130px"
              padding={6}
              marginBottom={4}
              border="1px solid #ccc"
              borderRadius={5}
              display="flex"
              flexDirection="column"
              justifyContent="center"
            >
              {library.loading ? (
                <Flex justifyContent="space-between">
                  <SkeletonText numberOfLines={2} width={40} />
                  <SkeletonCircle />
                </Flex>
              ) : (
                <Flex justifyContent="space-between">
                  <Flex flexDirection="column">
                    <Text color="accent.3" fontSize="text.level2" bold>
                      Audio
                    </Text>
                    <Text fontSize="text.level1">{`${audio?.length} uploaded resources`}</Text>
                  </Flex>
                  <FaRegFileAudio color="#BD1F46" size="32px" />
                </Flex>
              )}
            </Box>
          </Flex>
        </Box>
      </Flex>
    </AdminMainAreaWrapper>
  );
};

const MiniBox = ({ children, icon, iconBackgroundColor }) => {
  return (
    <Flex
      justifyContent="space-between"
      boxShadow="0px 1px 30px rgba(63, 63, 68, 0.05)"
      backgroundColor="white"
      padding={6}
    >
      {children}
      <Flex
        backgroundColor={iconBackgroundColor}
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
