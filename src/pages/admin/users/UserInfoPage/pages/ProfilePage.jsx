import { Box, Flex, Grid } from "@chakra-ui/layout";
import { ImArrowUp } from "react-icons/im";
import { Route, useParams } from "react-router-dom";
import {
  Heading,
  Link,
  SkeletonText,
  Text,
  Breadcrumb,
} from "../../../../../components";
import { useCache } from "../../../../../contexts";
import Icon from "@chakra-ui/icon";
import { FiCheckSquare } from "react-icons/fi";
import { BiCertification } from "react-icons/bi";
import { HiOutlineSwitchHorizontal } from "react-icons/hi";
import { BreadcrumbItem } from "@chakra-ui/react";
import { useComponentIsMount } from "../../../../../hooks";
import { useCallback, useEffect, useState } from "react";
import { adminGetUserDetails } from "../../../../../services";
import { Avatar, SkeletonCircle } from "@chakra-ui/react";

const useViewUserDetails = () => {
  const { handleGetOrSetAndGet } = useCache();
  const componentIsMount = useComponentIsMount();
  const { id: userId } = useParams();

  const [userDetails, setUserDetails] = useState({
    data: null,
    loading: false,
    err: null,
  });

  const fetcher = useCallback(async () => {
    const { user } = await adminGetUserDetails(userId);
    return user;
  }, [userId]);
  const fetchUserDetails = useCallback(async () => {
    setUserDetails({ loading: true });

    try {
      const userDetails = await handleGetOrSetAndGet(userId, fetcher);
      if (componentIsMount) setUserDetails({ data: userDetails });
    } catch (err) {
      console.error(err);
      if (componentIsMount) setUserDetails({ err: err.message });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId, componentIsMount]);

  useEffect(() => {
    fetchUserDetails();
  }, [fetchUserDetails]);

  const user = userDetails.data;
  const isLoading = userDetails.loading;
  const error = userDetails.err;

  return {
    user,
    isLoading,
    error,
  };
};

const ProfilePage = () => {
  const { user, isLoading } = useViewUserDetails();
  console.log(user);

  const userIsLoading = isLoading;

  return (
    <>
      <Box paddingX={2}>
        <Breadcrumb
          item2={
            <BreadcrumbItem>
              <Link href="/admin/users">Users</Link>
            </BreadcrumbItem>
          }
          item3={
            <BreadcrumbItem isCurrentPage>
              <Link href="#">Profile</Link>
            </BreadcrumbItem>
          }
        />
      </Box>

      <Box marginTop={2} padding={2}>
        <Section heading="Profile">
          <Box backgroundColor="white" padding={5} paddingX={10} shadow="md">
            <Heading
              as="h3"
              fontSize="text.level3"
              color="accent.3"
              marginBottom={10}
            >
              USER INFORMATION
            </Heading>

            <Grid templateColumns="153px 1.5fr 1.5fr" gap={16}>
              <Box width="200px" height="200px">
                {userIsLoading ? (
                  <SkeletonCircle size="200px" />
                ) : (
                  <Avatar
                    name={user?.firstName + " " + user?.lastName}
                    width="100%"
                    height="100%"
                    src={user?.profilePics}
                    rounded="full"
                  />
                )}
              </Box>

              <Box>
                {userIsLoading ? (
                  <SkeletonText numberOfLines={6} spacing={5} />
                ) : (
                  <>
                    <Detail name="first name" value={user?.firstName} />
                    <Detail name="last name" value={user?.lastName} />
                    <Detail
                      name="Email"
                      value={user?.email}
                      valueProps={{ color: "primary.base" }}
                    />
                    <Detail name="Phone" value={user?.phone} />
                    <Detail name="gender" value={user?.gender} />
                  </>
                )}
              </Box>

              <Box>
                {userIsLoading ? (
                  <SkeletonText numberOfLines={4} spacing={5} />
                ) : (
                  <>
                    <Detail name="department" value={user?.departmentName} />
                    <Detail name="role" value={user?.userRoleName} />
                  </>
                )}
              </Box>
            </Grid>
          </Box>
        </Section>

        <Section heading="Overview">
          <Grid
            templateColumns="repeat(3, minmax(150px, 1fr))"
            gridAutoRows="100px"
            gap={3}
          >
            <OverviewBox
              value={user?.gradePoint}
              name="Grade Point"
              icon={<ImArrowUp />}
              iconBackgroundColor="accent.6"
              href={`/admin/users/details/${user?.id}/grade-history`}
              isLoading={userIsLoading}
            />
            <OverviewBox
              value={user?.completedCourses}
              name="Completed Courses"
              icon={<FiCheckSquare />}
              iconBackgroundColor="accent.7"
              href={`/admin/users/details/${user?.id}/courses`}
              isLoading={userIsLoading}
            />
            <OverviewBox
              value={user?.noOfCertificate}
              name="Certificates"
              icon={<BiCertification />}
              iconBackgroundColor="secondary.5"
              href={`/admin/users/details/${user?.id}/certificate`}
              isLoading={userIsLoading}
            />
            <OverviewBox
              value={user?.completedAssessment}
              name="Completed Assessments"
              icon={<HiOutlineSwitchHorizontal />}
              iconBackgroundColor="accent.8"
              href={`/admin/users/details/${user?.id}/courses`}
              isLoading={userIsLoading}
            />
          </Grid>
        </Section>
      </Box>
    </>
  );
};

export const Detail = ({ name, value, valueProps }) => {
  return (
    <Grid templateColumns="110px 1fr" spacing={5} marginBottom={5}>
      <Text bold textTransform="capitalize">
        {name}:
      </Text>
      <Text {...valueProps}>{value || "notSet"}</Text>
    </Grid>
  );
};

export const Section = ({ heading, children }) => {
  return (
    <Box as="section" marginBottom={10}>
      <Box as="header">
        <Heading fontSize="heading.h3" marginLeft={6} marginBottom={5}>
          {heading}
        </Heading>
      </Box>

      {children}
    </Box>
  );
};

export const OverviewBox = ({
  iconBackgroundColor,
  icon,
  name,
  value,
  href,
  isLoading,
}) => {
  const renderContent = (props) => (
    <Flex
      position="absolute"
      width="100%"
      height="100%"
      alignItems="center"
      backgroundColor="white"
      shadow="md"
      paddingX={5}
      _hover={{ transform: "scale(1.01)" }}
      {...props}
    >
      <Grid
        boxSize="55px"
        rounded="full"
        placeItems="center"
        backgroundColor={iconBackgroundColor}
        color="white"
      >
        <Icon fontSize="heading.h3">{icon} </Icon>
      </Grid>

      <Box marginLeft={7} flex={1}>
        {isLoading ? (
          <SkeletonText />
        ) : (
          <>
            <Text bold as="level2">
              {value}
            </Text>
            <Text>{name}</Text>
          </>
        )}
      </Box>
    </Flex>
  );

  return isLoading ? (
    renderContent({ position: "unset" })
  ) : (
    <Link href={href} style={{ position: "relative" }}>
      {renderContent()}
    </Link>
  );
};

const ProfilePageRoute = ({ ...rest }) => {
  return <Route {...rest} render={(props) => <ProfilePage {...props} />} />;
};

export default ProfilePageRoute;
