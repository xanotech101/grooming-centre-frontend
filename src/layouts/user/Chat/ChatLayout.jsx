import {
  Avatar,
  Box,
  ButtonGroup,
  Flex,
  Grid,
  Stack,
  HStack,
} from "@chakra-ui/react";
import { Route } from "react-router-dom";
import { Button, Heading, Text, Input } from "../../../components";
import imagePlaceholder from "../../../assets/images/Avatar.svg";
import breakpoints, {
  maxWidthStyles_userPages,
} from "../../../theme/breakpoints";
import { MdAttachFile } from "react-icons/md";
import { truncateText } from "../../../utils";
import { GrEmoji } from "react-icons/gr";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { AiOutlinePlus } from "react-icons/ai";
import { IoIosSend } from "react-icons/io";
import { useFetch } from "../../../hooks";
import { useCallback, useEffect } from "react";
import { userGetMessages } from "../../../services";

const useFetcher = (fetcher) => {
  const { resource, handleFetchResource } = useFetch();

  const handleFetch = useCallback(
    () => handleFetchResource({ fetcher }),
    [fetcher, handleFetchResource]
  );

  useEffect(() => {
    handleFetch();
  }, [handleFetch]);

  return { resource, handleFetch };
};

const ChatLayout = () => {
  const messagesFetcher = useCallback(async () => {
    const { messages } = await userGetMessages();
    return messages;
  }, []);
  const {
    resource: messages,
    // handleFetch: handleMessagesRetry
  } = useFetcher(messagesFetcher);

  return (
    <Grid
      {...maxWidthStyles_userPages}
      maxWidth={breakpoints["laptop"]}
      gridTemplateColumns="325px 1fr"
      gridGap={10}
      padding={8}
    >
      <Box as="aside">
        <Box background="accent.1" padding={2} roundedTop="md">
          <Heading fontSize="text.level3">Messaging</Heading>
        </Box>

        <Box
          padding={3}
          overflowY="auto"
          height="calc(65vh + 82px + 73px - 43.19px)"
        >
          {messages.data &&
            messages.data.map((msg) => (
              <MessagesItem
                key={msg.id}
                msg={msg.message}
                date={msg.date}
                name={msg.user.name}
                profilePics={msg.user.profilePics}
                unreadCount={msg.unreadCount}
              />
            ))}
        </Box>
      </Box>

      <Box as="main" shadow="md">
        <Flex
          justifyContent="space-between"
          background="accent.1"
          padding={4}
          roundedTop="md"
        >
          <Flex>
            <Avatar
              name="John doe"
              src={imagePlaceholder}
              boxSize="50px"
              rounded="full"
            />

            <Box marginLeft={2}>
              <Text bold textTransform="capitalize">
                John doe
              </Text>
              <Text color="accent.7">last online 5 hours ago</Text>
            </Box>
          </Flex>

          <ButtonGroup spacing="4">
            <IconButton>
              <MdAttachFile />
            </IconButton>

            <IconButton>
              <BiDotsVerticalRounded />
            </IconButton>
          </ButtonGroup>
        </Flex>

        <Box height="65vh" overflowY="auto"></Box>

        <Flex padding={4} borderTop="1px" borderColor="accent.1">
          <IconButton backgroundColor="accent.1">
            <AiOutlinePlus />
          </IconButton>

          <Input id="type" placeholder="Type a message here" variant="ghost" />

          <IconButton shadow="none" marginRight={2}>
            <GrEmoji />
          </IconButton>

          <IconButton primary>
            <IoIosSend />
          </IconButton>
        </Flex>
      </Box>
    </Grid>
  );
};

const MessagesItem = ({ msg, name, date, profilePics, unreadCount }) => (
  <HStack
    borderBottom="1px"
    borderColor="accent.1"
    paddingY="5"
    alignItems="flex-start"
    spacing={3}
    pos="relative"
  >
    {unreadCount && (
      <Grid
        placeItems="center"
        boxSize="27px"
        rounded="full"
        backgroundColor="primary.base"
        color="white"
        pos="absolute"
        top={2.5}
        left={2.5}
        zIndex={1}
        border="3px solid"
        borderColor="white"
      >
        <Text as="level5" bold>
          {unreadCount}
        </Text>
      </Grid>
    )}

    <Avatar
      name={name}
      src={profilePics}
      boxSize="60px"
      rounded="full"
      alignSelf={"center"}
    />

    <Box flex={1}>
      <Text mb={2} textTransform="capitalize">
        {name}
      </Text>
      <Text as="level5">{truncateText(msg, 56)}</Text>
    </Box>

    <Stack alignItems="center">
      <Text as="level5" opacity={0.8}>
        {date}
      </Text>

      <IconButton>
        <BiDotsVerticalRounded />
      </IconButton>
    </Stack>
  </HStack>
);

const IconButton = ({ children, primary, ...rest }) => (
  <Button
    {...(primary ? { backgroundColor: "primary.base", color: "white" } : {})}
    asIcon
    shadow="md"
    {...rest}
  >
    {children}
  </Button>
);

export const ChatLayoutRoute = ({ ...rest }) => {
  return <Route {...rest} render={(props) => <ChatLayout {...props} />} />;
};
