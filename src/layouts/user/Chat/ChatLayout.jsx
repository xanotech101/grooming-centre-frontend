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
} from "@chakra-ui/react";
import { Route, useHistory } from "react-router-dom";
import {
  Button,
  Heading,
  Text,
  Input,
  SkeletonText,
  SearchBar,
} from "../../../components";
import imagePlaceholder from "../../../assets/images/Avatar.svg";
import breakpoints, {
  maxWidthStyles_userPages,
} from "../../../theme/breakpoints";
import { MdAttachFile } from "react-icons/md";
import { truncateText } from "../../../utils";
import { GrEmoji } from "react-icons/gr";
import { BiDotsVerticalRounded, BiRefresh } from "react-icons/bi";
import { AiOutlinePlus } from "react-icons/ai";
import { IoIosSend } from "react-icons/io";
import { useFetch, useQueryParams } from "../../../hooks";
import { Fragment, useCallback, useEffect } from "react";
import { userGetAUserMessages, userGetUsersMessages } from "../../../services";
import dayjs from "dayjs";
import { EmptyState } from "../../../layouts";
var relativeTime = require("dayjs/plugin/relativeTime");
dayjs.extend(relativeTime);

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
  const { resource, handleFetchResource } = useFetch();
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

  return { resource, handleFetch };
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
        height="calc(65vh + 82px + 73px - 43.19px)"
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
    handleFetch: handleCurrentMessagesRetry,
  } = useUserMessages();
  const userId = useQueryParams().get("userId");

  const noCurrentUser = !userId;
  // const noCurrentUserMessages = !currentUserMessages.loading && !currentUserMessages.err && currentUserMessages.data?.messages.length;

  return (
    <Box as="main" shadow="md">
      {noCurrentUser || currentUserMessages.err ? (
        <EmptyState
          height="calc(65vh + 82px)"
          heading={
            currentUserMessages.err
              ? "Ops! Something went wrong"
              : "No user selected"
          }
          description={
            currentUserMessages.err
              ? "An unexpected error occurred. Please try again later."
              : "Please select a user"
          }
          cta={
            currentUserMessages.err ? (
              <Button onClick={handleCurrentMessagesRetry}>Try Again</Button>
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
                      John doe
                    </Text>
                    <Text color="accent.7">Last online 5 hours ago</Text>
                  </>
                )}
              </Box>
            </Flex>

            <ButtonGroup spacing="4">
              <IconButton disabled={currentUserMessages.loading}>
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

          <Box height="65vh" overflowY="auto"></Box>
        </>
      )}

      <Flex padding={4} borderTop="1px" borderColor="accent.1">
        <IconButton backgroundColor="accent.1" disabled={noCurrentUser}>
          <AiOutlinePlus />
        </IconButton>

        <Input
          id="type"
          placeholder="Type a message here"
          variant="ghost"
          disabled={noCurrentUser}
        />

        <IconButton shadow="none" marginRight={2} disabled={noCurrentUser}>
          <GrEmoji />
        </IconButton>

        <IconButton primary disabled={noCurrentUser}>
          <IoIosSend />
        </IconButton>
      </Flex>
    </Box>
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
            {dayjs().to(dayjs(date))}
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

const MoreIconButton = ({ list }) => {
  return (
    <Menu placement="bottom-end">
      <MenuButton
        as={Box}
        cursor={!list ? "no-drop" : "pointer"}
        opacity={!list ? 0.5 : 1}
      >
        <IconButton>
          <BiDotsVerticalRounded />
        </IconButton>
      </MenuButton>

      {list && (
        <MenuList>
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
