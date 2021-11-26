import { Box, Grid } from "@chakra-ui/layout";
import { Button, Heading, Spinner, Text } from "../../../components";
import breakpoints from "../../../theme/breakpoints";
import { EmptyState } from "../../../layouts";
import dayjs from "dayjs";
import { hasEnded, isOngoing, isUpcoming } from "../../../utils";
import { Tag } from "@chakra-ui/tag";

export const EventListing = ({
  isLoading,
  hasError,
  eventsIsEmpty,
  events,
  headerButton,
}) => (
  <>
    {isLoading && <LoadingState />}
    {hasError && <ErrorState />}
    {eventsIsEmpty && (
      <EmptyState
        cta={<Button link="/dashboard">Return to dashboard</Button>}
        heading="No Upcoming Events"
        description="You have no events scheduled"
      />
    )}
    {events && !eventsIsEmpty && (
      <Listing events={events} headerButton={headerButton} />
    )}
  </>
);

const Listing = ({ events, headerButton }) => {
  return (
    <Box
      minHeight="50vh"
      maxWidth={breakpoints.tablet}
      marginX="auto"
      border="1px"
      backgroundColor="white"
      borderColor="accent.1"
      rounded="md"
    >
      <Grid
        columnGap={16}
        templateColumns="70px 1fr 160px"
        borderBottom="1px"
        borderColor="accent.1"
        px={3}
        height="65px"
        alignItems="center"
      >
        <Text opacity={0.8} textAlign="center" bold>
          Date
        </Text>
        <Text opacity={0.8} bold>
          Event Type
        </Text>

        {headerButton}
      </Grid>

      <Box px={3}>
        {events.map((event) => (
          <Grid
            key={event.id}
            columnGap={16}
            templateColumns="70px 1fr 160px"
            borderBottom="1px"
            borderColor="accent.1"
            py={5}
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
                <Tag
                  size="sm"
                  variant="solid"
                  marginLeft={6}
                  colorScheme={
                    isOngoing(event.startTime, event.endTime) ? "green" : "gray"
                  }
                >
                  {isOngoing(event.startTime, event.endTime) && "Ongoing Event"}
                  {hasEnded(event.endTime) && "Event Has Ended"}
                  {isUpcoming(event.startTime) && "Event Is Upcoming"}
                </Tag>
              </Text>
              <Text as="level2" bold my={1}>
                {event.name}
              </Text>
              <Text>{event.description}</Text>
            </Box>

            {event.renderAction ? (
              event.renderAction()
            ) : (
              <Button
                secondary
                disabled={!isOngoing(event.startTime, event.endTime)}
              >
                Join Event
              </Button>
            )}
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
