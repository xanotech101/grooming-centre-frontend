import { Box, Flex } from "@chakra-ui/layout";
import { Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/menu";
import { useCallback } from "react";
import { BiRightArrowAlt } from "react-icons/bi";
import { HiDotsVertical } from "react-icons/hi";
import { Route } from "react-router-dom";
import { Button } from "../../../components";
import { adminGetEventListing } from "../../../services";
import { isUpcoming } from "../../../utils";
import {
  EventListing,
  EventNameLink,
  useEventsPage,
  ViewEventButton,
} from "../../user";

export const useAdminEventsPage = () => {
  const fetcher = useCallback(async () => {
    const { events } = await adminGetEventListing();

    return events.map((event) => ({
      ...event,
      renderAction: () => (
        <Box marginLeft="auto">
          <MoreIcon event={event} />
        </Box>
      ),
      renderEventName: () => (
        <EventNameLink
          event={event}
          renderCallToAction={({ event }) => <EditButton event={event} />}
        />
      ),
    }));
  }, []);

  const { events, eventsIsEmpty, isLoading, hasError } = useEventsPage({
    fetcher,
    cacheKey: "admin-events",
  });

  return { events, eventsIsEmpty, isLoading, hasError };
};

const EventsPage = () => {
  const { events, eventsIsEmpty, isLoading, hasError } = useAdminEventsPage();

  return (
    <Flex marginTop="16" justifyContent="center">
      <EventListing
        isLoading={isLoading}
        hasError={hasError}
        eventsIsEmpty={eventsIsEmpty}
        events={events}
        headerButton={
          <Button link={`/admin/events/edit/new`}>Create Event</Button>
        }
      />
    </Flex>
  );
};

const MoreIcon = ({ event }) => {
  return (
    <Menu placement="bottom-end">
      <MenuButton
        padding={4}
        rounded="full"
        _hover={{ backgroundColor: "secondary.05" }}
      >
        <HiDotsVertical />
      </MenuButton>

      <MenuList position="relative" zIndex={2}>
        <ViewEventButton
          event={event}
          renderTrigger={({ onOpen }) => (
            <MenuItem onClick={onOpen}>View</MenuItem>
          )}
          renderCallToAction={({ event }) => <EditButton event={event} />}
        />
        <MenuItem>Edit</MenuItem>
      </MenuList>
    </Menu>
  );
};

const EditButton = ({ event }) => (
  <Button
    link={`/admin/events/edit/${event.id}`}
    disabled={!isUpcoming(event.startTime, event.endTime)}
    rightIcon={<BiRightArrowAlt />}
  >
    Edit Event
  </Button>
);

export const EventsPageRoute = ({ ...rest }) => {
  return <Route {...rest} render={(props) => <EventsPage {...props} />} />;
};
