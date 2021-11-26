import { Box, Flex } from "@chakra-ui/layout";
import { useCallback } from "react";
import { Route } from "react-router-dom";
import { Button } from "../../../components";
import { loggedInUserGetEventListing } from "../../../services";
import { EventListing, useEventsPage } from "../../user";

const EventsPage = () => {
  const fetcher = useCallback(async () => {
    const { events } = await loggedInUserGetEventListing();

    return events.map((event) => ({
      ...event,
      renderAction: () => (
        <Box marginLeft="auto">
          <Button secondary sm>
            Edit Event
          </Button>
        </Box>
      ),
    }));
  }, []);

  const { events, eventsIsEmpty, isLoading, hasError } = useEventsPage({
    fetcher,
    cacheKey: "admin-events",
  });
  console.log(events);

  return (
    <Flex height="100%" alignItems="center" justifyContent="center">
      <EventListing
        isLoading={isLoading}
        hasError={hasError}
        eventsIsEmpty={eventsIsEmpty}
        events={events}
        headerButton={
          <Button
            link={`/admin/events/create`}
            // paddingX={6}
            // fontSize="text.level4"
          >
            Create Event
          </Button>
        }
      />
    </Flex>
  );
};

export const EventsPageRoute = ({ ...rest }) => {
  return <Route {...rest} render={(props) => <EventsPage {...props} />} />;
};
