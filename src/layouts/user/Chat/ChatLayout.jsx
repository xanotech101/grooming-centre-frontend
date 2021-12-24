import {
  Avatar,
  Box,
  ButtonGroup,
  Flex,
  Grid,
  Stack,
  HStack,
  SkeletonCircle,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Tooltip,
  useDisclosure,
  Modal as ModalChakraUI,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalFooter,
  ModalCloseButton,
  ModalHeader,
  Skeleton,
  useToast,
  Spinner,
} from "@chakra-ui/react";
import { Route, useHistory } from "react-router-dom";
import {
  Button,
  Heading,
  Text,
  Input,
  SkeletonText,
  SearchBar,
  Image,
} from "../../../components";
import imagePlaceholder from "../../../assets/images/Avatar.svg";
import breakpoints, {
  maxWidthStyles_userPages,
} from "../../../theme/breakpoints";
import { MdAttachFile } from "react-icons/md";
import { capitalizeFirstLetter, truncateText } from "../../../utils";
import { GrEmoji } from "react-icons/gr";
import {
  BiCheckDouble,
  BiDotsVerticalRounded,
  BiRefresh,
} from "react-icons/bi";
import { AiOutlinePlus, AiOutlineClose } from "react-icons/ai";
import { IoIosSend } from "react-icons/io";
import { useFetch, useQueryParams } from "../../../hooks";
import { Fragment, useCallback, useEffect, useRef, useState } from "react";
import {
  currentUserMessagePayload,
  userGetAUserMessages,
  userGetUsersMessages,
} from "../../../services";
import { EmptyState } from "../../../layouts";
import errorImage from "../../../assets/images/error.svg";
import { useApp } from "../../../contexts";
import { useForm } from "react-hook-form";
import Picker, { SKIN_TONE_MEDIUM_DARK } from "emoji-picker-react";

const useAllUsersMessages = () => {
  const { resource, handleFetchResource } = useFetch();

  const fetcher = useCallback(async () => {
    const { users } = await userGetUsersMessages();
    return users;
  }, []);

  const handleFetch = useCallback(
    () => handleFetchResource({ fetcher }),
    [fetcher, handleFetchResource]
  );

  useEffect(() => {
    handleFetch();
  }, [handleFetch]);

  return { resource, handleFetch };
};

const useUserMessages = () => {
  const { resource, setResource, handleFetchResource } = useFetch();
  const userId = useQueryParams().get("userId");

  const fetcher = useCallback(async () => {
    const { user } = await userGetAUserMessages(userId);
    return user;
  }, [userId]);

  const handleFetch = useCallback(
    () => handleFetchResource({ fetcher }),
    [fetcher, handleFetchResource]
  );

  useEffect(() => {
    if (userId) handleFetch();
  }, [handleFetch, userId]);

  return { resource, setResource, handleFetch };
};

const ChatLayout = () => {
  return (
    <Grid
      {...maxWidthStyles_userPages}
      maxWidth={breakpoints["laptop"]}
      gridTemplateColumns="325px 1fr"
      gridGap={10}
      padding={8}
    >
      <Aside />

      <ChatArea />
    </Grid>
  );
};

const Aside = () => {
  const { resource: allUsersMessages, handleFetch: handleMessagesRetry } =
    useAllUsersMessages();

  return (
    <Box as="aside">
      <Flex
        background="accent.1"
        padding={2}
        roundedTop="md"
        justifyContent="space-between"
        alignItems={"center"}
      >
        <Heading fontSize="text.level3">Messaging</Heading>

        <MoreIconButton
          list={[
            {
              renderContent: () => (
                <ListOfUsers
                  renderTrigger={({ onOpen }) => (
                    <MenuItem onClick={onOpen}>View All Users</MenuItem>
                  )}
                />
              ),
            },
          ]}
        />
      </Flex>

      <Box
        padding={3}
        overflowY="auto"
        height="calc(60vh + 82px + 73px - 55px)"
      >
        {allUsersMessages.loading &&
          [1, 2, 3, 4, 5].map((i) => <UsersMessagesItem isLoading key={i} />)}

        {allUsersMessages.data &&
          allUsersMessages.data.map((userMsg) => (
            <UsersMessagesItem
              key={userMsg.id}
              msg={userMsg.message}
              date={userMsg.date}
              name={userMsg.user.name}
              userId={userMsg.user.id}
              profilePics={userMsg.user.profilePics}
              unreadCount={userMsg.unreadCount}
            />
          ))}

        {allUsersMessages.err && (
          <Flex
            textAlign="center"
            alignItems="center"
            justifyContent="center"
            minHeight="386px"
            flexDirection="column"
          >
            <Text color="secondary.5" fontSize="heading.h4">
              Ops! Something went wrong
            </Text>

            <Button
              mt={5}
              leftIcon={<BiRefresh />}
              onClick={handleMessagesRetry}
            >
              Try Again
            </Button>
          </Flex>
        )}
      </Box>
    </Box>
  );
};

const ChatArea = () => {
  const {
    resource: currentUserMessages,
    setResource: setCurrentUserMessages,
    handleFetch: handleCurrentMessagesRetry,
  } = useUserMessages();
  const userId = useQueryParams().get("userId");

  const {
    state: { user: currentLoggedInUser },
  } = useApp();

  const toast = useToast();

  const noCurrentUser = !userId;
  const noCurrentUserMessages =
    !currentUserMessages.loading &&
    !currentUserMessages.err &&
    currentUserMessages.data?.conversations.length === 0;

  const conversations = currentUserMessages.data
    ? currentUserMessages.data.conversations.map((item, index, list) => ({
        ...item,
        date:
          list[index + 1]?.date === list[index].date &&
          list[index + 1]?.userId === list[index].userId
            ? null
            : item.date,
        userProfilePics:
          list[index - 1]?.userId === list[index].userId
            ? "skip"
            : item.userProfilePics,
      }))
    : null;

  const messagesRef = useRef();

  const scrollMessagesToBottom = () => {
    setTimeout(
      () => (messagesRef.current.scrollTop = messagesRef.current.scrollHeight),
      300
    );
  };

  const handleFocusTypeInput = () =>
    document.querySelector("#type-message")?.focus();

  const handleNewMessageAdd = (payload) => {
    console.log(payload);

    setCurrentUserMessages((currentUserMessages) => ({
      data: {
        ...currentUserMessages.data,
        conversations: [...currentUserMessages.data.conversations, payload],
      },
    }));
  };

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
    reset,
    setValue,
    getValues,
  } = useForm();

  const handleEmojiSelect = ({ emoji }) =>
    setValue("message", `${getValues("message")}${emoji}`);

  const onSubmit = async ({ message }) => {
    try {
      handleNewMessageAdd(
        currentUserMessagePayload({
          title: message,
          userId: currentLoggedInUser.id,
        })
      );

      reset();
    } catch (err) {
      toast({
        description: capitalizeFirstLetter(err.message),
        position: "top",
        status: "error",
      });
    }
  };

  useEffect(() => {
    if (conversations?.length > 0) {
      handleFocusTypeInput();
      scrollMessagesToBottom();
    }
  }, [conversations?.length]);

  return (
    <Box as="main" shadow="md">
      {noCurrentUser || currentUserMessages.err || noCurrentUserMessages ? (
        <EmptyState
          height="calc(60vh + 82px)"
          illustration={
            noCurrentUserMessages ? undefined : (
              <Image
                src={errorImage}
                height="200px"
                alt="Course Header"
                mb={5}
                transform="translateX(-10px)"
              />
            )
          }
          heading={
            currentUserMessages.err
              ? "Ops! Something went wrong"
              : noCurrentUserMessages
              ? "No messages yet"
              : "No user selected"
          }
          description={
            noCurrentUserMessages
              ? "Start messaging to get started"
              : currentUserMessages.err
              ? "An unexpected error occurred. Please try again later."
              : "Please select a user"
          }
          cta={
            currentUserMessages.err ? (
              <Button onClick={handleCurrentMessagesRetry}>Try Again</Button>
            ) : noCurrentUserMessages ? (
              <Button onClick={handleFocusTypeInput}>
                Start A Conversation
              </Button>
            ) : (
              <ListOfUsers
                renderTrigger={({ onOpen }) => (
                  <Button onClick={onOpen}>Start A Conversation</Button>
                )}
              />
            )
          }
        />
      ) : (
        <>
          <Flex
            justifyContent="space-between"
            background="accent.1"
            padding={4}
            roundedTop="md"
          >
            <Flex>
              {currentUserMessages.loading && <SkeletonCircle boxSize="50px" />}

              {currentUserMessages.data && (
                <Avatar
                  name={currentUserMessages.data.user.name}
                  src={currentUserMessages.data.user.profilePics}
                  boxSize="50px"
                  rounded="full"
                />
              )}

              <Box marginLeft={2}>
                {currentUserMessages.loading && (
                  <SkeletonText numberOfLines={2} width="300px" />
                )}

                {currentUserMessages.data && (
                  <>
                    <Text bold textTransform="capitalize">
                      {currentUserMessages.data.user.name}
                    </Text>
                    <Text color="accent.7">Last online 5 hours ago</Text>
                  </>
                )}
              </Box>
            </Flex>

            <ButtonGroup spacing="4">
              <IconButton
                // disabled={currentUserMessages.loading}
                disabled // TODO: remove this we support upload
              >
                <MdAttachFile />
              </IconButton>

              <MoreIconButton
                list={
                  !currentUserMessages.loading && [
                    { text: "Delete Entire Conversation" },
                  ]
                }
              />
            </ButtonGroup>
          </Flex>

          <Box height="60vh" overflowY="auto" py={4} ref={messagesRef}>
            {currentUserMessages.loading && !currentLoggedInUser && (
              <>
                <MessageBox isLoading />
                <MessageBox isLoading />
                <MessageBox isLoading mine />
                <MessageBox isLoading />
                <MessageBox isLoading mine />
                <MessageBox isLoading />
              </>
            )}

            {currentLoggedInUser &&
              conversations?.map((message) => {
                return (
                  <MessageBox
                    key={message.id}
                    mine={currentLoggedInUser?.id === message.userId}
                    profilePics={message.userProfilePics}
                    name={currentUserMessages.data.user.name}
                    date={message.date}
                  >
                    <Text>{message.title}</Text>
                  </MessageBox>
                );
              })}
          </Box>
        </>
      )}

      <Flex
        as="form"
        padding={4}
        borderTop="1px"
        borderColor="accent.1"
        onSubmit={handleSubmit(onSubmit)}
      >
        <IconButton
          backgroundColor="accent.1"
          // disabled={noCurrentUser || !currentUserMessages.data}
          disabled // TODO: remove this we support upload
        >
          <AiOutlinePlus />
        </IconButton>

        <Input
          id="type-message"
          placeholder="Type a message here"
          variant="ghost"
          disabled={noCurrentUser || !currentUserMessages.data}
          mx={2}
          {...register("message", {
            required: true,
          })}
        />

        <EmojiPicker
          disabled={noCurrentUser || !currentUserMessages.data}
          onSelect={handleEmojiSelect}
        />

        <IconButton
          primary
          disabled={
            noCurrentUser ||
            !currentUserMessages.data ||
            isSubmitting ||
            !currentLoggedInUser
          }
          type="submit"
        >
          {isSubmitting ? <Spinner /> : <IoIosSend />}
        </IconButton>
      </Flex>
    </Box>
  );
};

const EmojiPicker = ({ disabled, onSelect }) => {
  const [displayPicker, setDisplayPicker] = useState(false);

  const handleTogglePicker = () => setDisplayPicker((prev) => !prev);

  const onEmojiClick = (_event, emojiObject) => {
    onSelect(emojiObject);
    setDisplayPicker(false);
  };

  return (
    <Box pos="relative">
      <IconButton
        shadow="none"
        marginRight={2}
        disabled={disabled}
        onClick={handleTogglePicker}
        primary={displayPicker}
      >
        {displayPicker ? <AiOutlineClose /> : <GrEmoji />}
      </IconButton>

      {displayPicker && (
        <Box pos="absolute" bottom="110%" right="0" zIndex={100}>
          <Picker
            onEmojiClick={onEmojiClick}
            disableAutoFocus={true}
            skinTone={SKIN_TONE_MEDIUM_DARK}
            groupNames={{ smileys_people: "PEOPLE" }}
            native
          />
        </Box>
      )}
    </Box>
  );
};

const MessageBox = ({ children, mine, isLoading, profilePics, name, date }) => {
  const style = {
    maxWidth: "80%",
    border: "1px",
    color: mine ? "accent.3" : "white",
    backgroundColor: !mine && "accent.3",
    p: 4,
    rounded: "1rem",
    roundedTopStart: !mine && "none",
    roundedBottomRight: mine && "none",
    position: "relative",
  };

  const moreList = mine
    ? [{ text: "Edit This Messages" }, { text: "Delete this Message" }]
    : [{ text: "Delete this Message" }];

  return (
    <Flex
      p={2}
      pb={0}
      justifyContent={isLoading && (mine ? "flex-end" : "flex-start")}
    >
      {isLoading ? (
        <Skeleton
          {...style}
          width={Math.random() > 0.5 ? "50%" : "40%"}
          height="55px"
        />
      ) : (
        <>
          {!mine && profilePics !== "skip" && (
            <Avatar
              name={name}
              src={profilePics}
              rounded="full"
              boxSize="30px"
              mr={3}
            />
          )}
          {!mine && profilePics === "skip" && <Box boxSize="30px" mr={3}></Box>}

          <Stack
            flex={1}
            alignItems={mine ? "flex-end" : "flex-start"}
            pos="relative"
          >
            <Box {...style}>
              {children}

              <Box
                position="absolute"
                zIndex="1"
                top={"50%"}
                transform="translateY(-50%)"
                left={!mine && "calc(100% + 20px)"}
                right={mine && "calc(100% + 20px)"}
              >
                <MoreIconButton
                  transform="rotate(90deg)"
                  color="accent.3"
                  list={moreList}
                  placement={mine ? "left" : "right"}
                />
              </Box>
            </Box>

            {mine && (
              <Box position="absolute" right={2} top="-3px">
                {/* <BiCheck /> */}
                <BiCheckDouble />
              </Box>
            )}

            {date && (
              <Text color="accent.3" pb={2}>
                {date}
              </Text>
            )}
          </Stack>
        </>
      )}
    </Flex>
  );
};

const ListOfUsers = ({ renderTrigger }) => {
  // const { resource: allUsers, handleFetch: handleUsersRetry } = useFetch();

  const handleSearch = () => {
    console.log("searching...");
  };

  return (
    <Modal
      renderTrigger={renderTrigger}
      renderHeader={() => "Select a user"}
      showCloseBtn
    >
      <SearchBar
        sm
        marginBottom={2}
        placeholder="First Name, Last Name, Email, Phone"
        fontSize="text.level5"
        onSearch={handleSearch}
      />

      <Text bold marginBottom={5}>
        <Box as="span" color="primary.base">
          1
        </Box>{" "}
        Users found
      </Text>

      {[0, 1, 2, 3].map((e, i) => (
        <Flex
          key={i}
          borderTop={i && "1px"}
          borderColor={i && "accent.1"}
          paddingY="3"
          transition=".05s"
          cursor="pointer"
          _hover={{ transform: "scale(1.01)" }}
        >
          <Avatar
            name="John doe"
            src={imagePlaceholder}
            boxSize="35px"
            rounded="full"
          />

          <Box marginLeft={2}>
            <Text bold textTransform="capitalize">
              John doe
            </Text>
          </Box>
        </Flex>
      ))}
    </Modal>
  );
};

const UsersMessagesItem = ({
  userId,
  msg,
  name,
  date,
  profilePics,
  unreadCount,
  isLoading,
}) => {
  const { push } = useHistory();

  const handleViewConversation = () => {
    push(`/chats?userId=${userId}`);
  };

  return (
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
      {isLoading ? (
        <SkeletonCircle boxSize="60px" />
      ) : (
        <Avatar
          name={name}
          src={profilePics}
          boxSize="60px"
          rounded="full"
          alignSelf={"center"}
          cursor="pointer"
          onClick={handleViewConversation}
        />
      )}

      <Box flex={1} cursor="pointer" onClick={handleViewConversation}>
        {!isLoading ? (
          <>
            <Box mb={2}>
              {name.length >= 20 ? (
                <Tooltip label={name}>
                  <Text textTransform="capitalize">
                    {truncateText(name, 20)}
                  </Text>
                </Tooltip>
              ) : (
                <Text textTransform="capitalize">{truncateText(name, 22)}</Text>
              )}

              <Text color="accent.5" as="level5">
                active
              </Text>
            </Box>

            <Text as="level5">{truncateText(msg, 56)}</Text>
          </>
        ) : (
          <>
            <SkeletonText numberOfLines={1} mb={5} />
            <SkeletonText numberOfLines={2} />
          </>
        )}
      </Box>

      {!isLoading && (
        <Stack alignItems="center">
          <Text as="level5" opacity={0.8}>
            {date}
          </Text>

          <MoreIconButton
            list={[
              { text: "Delete Conversation" },
              { text: "View Conversation", onClick: handleViewConversation },
            ]}
          />
        </Stack>
      )}
    </HStack>
  );
};

const MoreIconButton = ({ list, placement = "bottom-end", ...rest }) => {
  return (
    <Menu placement={placement}>
      <MenuButton
        as={Box}
        cursor={!list ? "no-drop" : "pointer"}
        opacity={!list ? 0.5 : 1}
      >
        <IconButton {...rest}>
          <BiDotsVerticalRounded />
        </IconButton>
      </MenuButton>

      {list && (
        <MenuList color="black">
          {list.map((item, index) =>
            item.renderContent ? (
              <Fragment key={index}>{item.renderContent()}</Fragment>
            ) : (
              <MenuItem key={item.text} {...item}>
                {item.text}
              </MenuItem>
            )
          )}
        </MenuList>
      )}
    </Menu>
  );
};

export function Modal({
  renderHeader,
  renderTrigger,
  renderCloseBtn,
  renderPrimaryBtn,
  children,
  showCloseBtn,
  ...rest
}) {
  const props = useDisclosure();

  return (
    <>
      {renderTrigger(props)}

      <ModalChakraUI isOpen={props.isOpen} onClose={props.onClose} {...rest}>
        <ModalOverlay />

        <ModalContent>
          {renderHeader && <ModalHeader>{renderHeader(props)}</ModalHeader>}
          {showCloseBtn && <ModalCloseButton />}

          <ModalBody>{children}</ModalBody>

          {(renderPrimaryBtn || renderCloseBtn) && (
            <ModalFooter>
              {renderCloseBtn?.({
                ...props,
                style: { ghost: true, marginRight: 3 },
              })}

              {renderPrimaryBtn?.({ ...props, style: {} })}
            </ModalFooter>
          )}
        </ModalContent>
      </ModalChakraUI>
    </>
  );
}

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
