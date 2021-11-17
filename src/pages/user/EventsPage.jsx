import { Box, Grid, Stack } from "@chakra-ui/layout";
import { useEffect, useCallback } from "react";
import { Route } from "react-router-dom";
import { Button, Heading, Image, Spinner, Text } from "../../components";
import { useFetchAndCache } from "../../hooks";
import { loggedInUserGetEventListing } from "../../services";
import coverImagePlaceholder from "../../assets/images/events-banner.svg";
import breakpoints, { maxWidthStyles_userPages } from "../../theme/breakpoints";
import { EmptyState } from "../../layouts";
import dayjs from "dayjs";
var isoWeek = require("dayjs/plugin/isoWeek");
dayjs.extend(isoWeek);

const useEventsPage = () => {
  const { resource, handleFetchResource } = useFetchAndCache();

  const fetcher = useCallback(async () => {
    const { events } = await loggedInUserGetEventListing();

    return events;
  }, []);

  useEffect(() => {
    handleFetchResource({ cacheKey: "events", fetcher });
  }, [fetcher, handleFetchResource]);

  return {
    events: resource.data,
    eventsIsEmpty:
      !resource.loading &&
      !resource.err &&
      resource.data &&
      !resource.data?.length,
    isLoading: resource.loading,
    hasError: resource.err,
  };
};

const EventsPage = () => {
  const { events, eventsIsEmpty, isLoading, hasError } = useEventsPage();

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

      {isLoading && <LoadingState />}
      {hasError && <ErrorState />}
      {eventsIsEmpty && (
        <EmptyState
          cta={<Button link="/dashboard">Return to dashboard</Button>}
          heading="No Upcoming Events"
          description="You have no events scheduled"
        />
      )}
      {events && !eventsIsEmpty && <Listing events={events} />}
    </Box>
  );
};

const Listing = ({ events }) => {
  const hasEnded = (event) => Date.now() > new Date(event.endTime).getTime();

  const isUpcoming = (event) =>
    new Date(event.startTime).getTime() > Date.now();

  const isOngoing = (event) =>
    Date.now() > new Date(event.startTime) && !hasEnded(event);

  return (
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
        {events.map((event) => (
          <Grid
            key={event.id}
            columnGap={16}
            templateColumns="70px 1fr 150px"
            borderBottom="1px"
            borderColor="accent.1"
            py={5}
            alignItems="center"
          >
            <Box textAlign="center">
              <Text color="primary.hover" as="level5">
                {dayjs(event.startTime).format("dddd")}
              </Text>
              <Text fontSize="heading.h3" bold color="primary.base">
                {dayjs(event.startTime).format("D")}
              </Text>
              <Text bold>{dayjs(event.startTime).format("MMM")}</Text>
            </Box>

            <Box>
              <Text color="primary.hover" as="level5">
                {dayjs(event.startTime).format("h:mm A")} to{" "}
                {dayjs(event.endTime).format("h:mm A")}
              </Text>
              <Text as="level2" bold my={1}>
                {event.name}
              </Text>
              <Text>{event.description}</Text>
            </Box>

            <Button secondary disabled={!isOngoing(event)}>
              {isOngoing(event) && "Join Event"}
              {hasEnded(event) && "Event Has Ended"}
              {isUpcoming(event) && "Event Is Upcoming"}
            </Button>
          </Grid>
        ))}
      </Box>
    </Box>
  );
};

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
