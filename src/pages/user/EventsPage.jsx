import { Box, Grid, Stack } from "@chakra-ui/layout";
import { Route } from "react-router-dom";
import { Button, Heading, Image, Spinner, Text } from "../../components";
import emptyImage from "../../assets/images/empty-events.svg";
import coverImagePlaceholder from "../../assets/images/events-banner.svg";
import breakpoints, { maxWidthStyles_userPages } from "../../theme/breakpoints";
import { PageLoaderLayout } from "../../layouts";

const EventsPage = () => {
  return (
    <Box>
      <Box
        as="section"
        padding={10}
        marginBottom={10}
        // backgroundColor="secondary.9"
        color="white"
        position="relative"
      >
        <Image
          src={coverImagePlaceholder}
          width="100%"
          height="100%"
          top={0}
          left={0}
          position="absolute"
          alt="Course Header"
        />

        <Stack
          spacing={7}
          position="relative"
          // zIndex={1}
          {...maxWidthStyles_userPages}
        >
          <Heading>Upcoming Events</Heading>
          <Text as="level2">Here is your schedule for the upcoming days</Text>
        </Stack>
      </Box>

      {/* <EmptyState /> */}
      {/* <LoadingState /> */}
      {/* <ErrorState /> */}

      <Box
        minHeight="50vh"
        maxWidth={breakpoints.tablet}
        marginX="auto"
        border="1px"
        borderColor="accent.1"
        rounded="md"
      >
        <Grid
          columnGap={16}
          templateColumns="70px auto"
          borderBottom="1px"
          borderColor="accent.1"
          p={3}
          opacity={0.7}
        >
          <Text textAlign="center" bold>
            Date
          </Text>
          <Text bold>Event Type</Text>
        </Grid>

        <Box px={3}>
          <Grid
            columnGap={16}
            templateColumns="70px 1fr 120px"
            borderBottom="1px"
            borderColor="accent.1"
            py={5}
            alignItems="center"
          >
            <Box textAlign="center">
              <Text color="primary.hover" as="level5">
                Wednesday
              </Text>
              <Text fontSize="heading.h3" bold>
                30
              </Text>
              <Text bold opacity={0.7}>
                SEPT
              </Text>
            </Box>

            <Box>
              <Text color="primary.hover" as="level5">
                09:00 am to 10:30 am
              </Text>
              <Text as="level2" bold my={1}>
                Video Conference
              </Text>
              <Text>Web Design & Development Crash Course 2021</Text>
            </Box>

            <Button secondary>Join Event</Button>
          </Grid>
        </Box>
      </Box>
    </Box>
  );
};

const EmptyState = ({ children, ...rest }) => (
  <PageLoaderLayout height="60vh" width="100%" {...rest}>
    {children || (
      <>
        <Image
          src={emptyImage}
          height="200px"
          alt="Course Header"
          mb={5}
          transform="translateX(-10px)"
        />

        <Heading type="h3">No Upcoming Events</Heading>
        <Text as="level3" bold mt={3} mb={6}>
          You have no events scheduled
        </Text>

        <Button link="/dashboard">Return to dashboard</Button>
      </>
    )}
  </PageLoaderLayout>
);

const LoadingState = () => (
  <EmptyState height="50vh">
    <Spinner />
  </EmptyState>
);

const ErrorState = () => (
  <EmptyState height="50vh">
    <Heading type="h3">Something went wrong</Heading>
  </EmptyState>
);

export const EventsPageRoute = ({ ...rest }) => {
  return <Route {...rest} render={(props) => <EventsPage {...props} />} />;
};
