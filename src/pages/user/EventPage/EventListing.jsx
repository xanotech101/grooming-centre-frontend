import { Box, Flex, Grid } from "@chakra-ui/layout";
import { Button, Heading, Spinner, Text } from "../../../components";
import breakpoints from "../../../theme/breakpoints";
import { EmptyState } from "../../../layouts";
import dayjs from "dayjs";
import {
  hasEnded,
  isOngoing,
  isUpcoming,
  sortByMostRelevantDate,
  truncateText,
} from "../../../utils";
import { Tag } from "@chakra-ui/tag";
import { useDisclosure } from "@chakra-ui/hooks";
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/modal";
import { BiRightArrowAlt } from "react-icons/bi";
import { useApp } from "../../../contexts";
import { useFetch } from "../../../hooks";
import { userJoinEvent } from "../../../services";
import { useToast } from "@chakra-ui/toast";

export const EventListing = ({
  isLoading,
  hasError,
  forAdmin,
  eventsIsEmpty,
  events,
  headerButton,
}) => (
  <>
    {isLoading && <LoadingState />}
    {hasError && <ErrorState />}
    {eventsIsEmpty &&
      (forAdmin ? (
        <EmptyState
          cta={<Button link="/admin/events/edit/new">Create one</Button>}
          heading="No Events yet!"
          description="There isn't any event yet. Create one to get started!"
        />
      ) : (
        <EmptyState
          cta={<Button link="/dashboard">Return to dashboard</Button>}
          heading="No Upcoming Events"
          description="You have no events scheduled"
        />
      ))}
    {events && !eventsIsEmpty && (
      <Listing events={events} headerButton={headerButton} />
    )}
  </>
);

const Listing = ({ events, headerButton }) => {
  events = sortByMostRelevantDate(events);

  const { resource: joinEventResource, handleFetchResource } = useFetch();
  const toast = useToast();

  const handleJoinEvent = (id, link) =>
    handleFetchResource({
      fetcher: async () => {
        await userJoinEvent(id);

        return { link };
      },
      onError: (err) => {
        console.error(err);
        toast({
          description: "Something went wrong! please try again later",
          status: "error",
          position: "top",
        });
      },
      onSuccess: (event) => {
        window.location.href = event.link;
      },
    });

  return (
    <Box
      minHeight="50vh"
      maxWidth={breakpoints.laptop}
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

              {event.renderEventName ? (
                event.renderEventName()
              ) : (
                <EventNameLink event={event} />
              )}

              <Text>{truncateText(event.description, 60)}</Text>
            </Box>

            {event.renderAction ? (
              event.renderAction()
            ) : (
              <ViewEventButton
                event={event}
                joinEventResource={joinEventResource}
                handleJoinEvent={handleJoinEvent}
              />
            )}
          </Grid>
        ))}
      </Box>
    </Box>
  );
};

const JoinEventButton = ({ event, onJoinEvent, resource }) => {
  return (
    <Button
      isLoading={resource.loading || resource.data}
      disabled={
        true
        // !isOngoing(event.startTime, event.endTime) ||          //Uncomment out
        // resource.loading ||
        // resource.data
      }
      rightIcon={<BiRightArrowAlt />}
      onClick={onJoinEvent.bind(null, event.id, event.link)}
    >
      Join Event
    </Button>
  );
};

export const EventNameLink = ({ event, renderCallToAction }) => (
  <ViewEventButton
    event={event}
    renderCallToAction={renderCallToAction}
    renderTrigger={({ onOpen }) => (
      <Text
        as="level2"
        bold
        my={1}
        onClick={onOpen}
        _hover={{ textDecoration: "underline", cursor: "pointer" }}
      >
        {event.name}
      </Text>
    )}
  />
);

export const ViewEventButton = ({
  event,
  renderTrigger,
  renderCallToAction,
  joinEventResource,
  handleJoinEvent,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { getOneMetadata } = useApp();

  return (
    <>
      {renderTrigger ? (
        renderTrigger({ onOpen })
      ) : (
        <Button secondary onClick={onOpen}>
          View Event
        </Button>
      )}

      <Modal
        blockScrollOnMount={false}
        isOpen={isOpen}
        onClose={onClose}
        size="xl"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <Flex>
              {event.name}

              <Box>
                <Tag
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
              </Box>
            </Flex>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text mb={8}>{event.description}</Text>

            <Text my={2} as="level3">
              <Box as="b" mr={5}>
                DATE:
              </Box>
              {dayjs(event.startTime).format("dddd, D MMMM.")}
            </Text>
            <Text my={2} as="level3">
              <Box as="b" mr={5}>
                TIME:
              </Box>
              {dayjs(event.startTime).format("h:mm A")} -{" "}
              {dayjs(event.endTime).format("h:mm A.")}
            </Text>

            {renderCallToAction ? (
              <>
                <Text my={2} as="level3">
                  <Box as="b" mr={5}>
                    DEPARTMENT:
                  </Box>
                  {event.departmentId
                    ? getOneMetadata("departments", event.departmentId, {
                        allMetadata: true,
                      })?.name
                    : "N/A"}
                </Text>

                <Text my={2} as="level3">
                  <Box as="b" mr={5}>
                    ATTENDEES:
                  </Box>
                  {event.attendeesCount}
                </Text>
              </>
            ) : null}
          </ModalBody>

          <ModalFooter>
            <Button secondary mr={3} onClick={onClose}>
              Close
            </Button>

            {renderCallToAction ? (
              renderCallToAction({ event })
            ) : (
              <JoinEventButton
                event={event}
                resource={joinEventResource}
                onJoinEvent={handleJoinEvent}
              />
            )}
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
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
