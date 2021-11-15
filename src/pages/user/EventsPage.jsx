import { Box, Stack } from "@chakra-ui/layout";
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
        padding={5}
        minHeight="50vh"
        maxWidth={breakpoints.laptop}
        marginX="auto"
      ></Box>
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
