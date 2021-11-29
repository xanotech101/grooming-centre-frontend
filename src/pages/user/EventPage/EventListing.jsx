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
  events = sortByMostRelevantDate(events);

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
              <Text>{truncateText(event.description, 122)}</Text>
            </Box>

            {event.renderAction ? (
              event.renderAction()
            ) : (
              <ViewEventButton event={event} />
            )}
          </Grid>
        ))}
      </Box>
    </Box>
  );
};

const JoinEventButton = ({ event }) => (
  <Button
    disabled={!isOngoing(event.startTime, event.endTime)}
    rightIcon={<BiRightArrowAlt />}
  >
    Join Event
  </Button>
);

const ViewEventButton = ({ event }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const getSpeakers = () =>
    event.speakers.reduce(
      (acc, speaker, index) => `${acc}${index ? ", " : ""}${speaker.name}`,
      ""
    );

  return (
    <>
      <Button secondary onClick={onOpen}>
        View Event
      </Button>

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
            <Text my={2} as="level3">
              <Box as="b" mr={5}>
                SPEAKERS:
              </Box>
              {getSpeakers() ? `${getSpeakers()}.` : <Tag>No Speakers</Tag>}
            </Text>
          </ModalBody>

          <ModalFooter>
            <Button secondary mr={3} onClick={onClose}>
              Close
            </Button>

            <JoinEventButton event={event} />
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
