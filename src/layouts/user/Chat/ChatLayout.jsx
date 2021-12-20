import { Avatar, Box, ButtonGroup, Flex, Grid } from "@chakra-ui/react";
import { Route } from "react-router-dom";
import { Button, Heading, Text, Input } from "../../../components";
import imagePlaceholder from "../../../assets/images/Avatar.svg";
import breakpoints, {
  maxWidthStyles_userPages,
} from "../../../theme/breakpoints";
import { MdAttachFile } from "react-icons/md";
import { GrEmoji } from "react-icons/gr";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { AiOutlinePlus } from "react-icons/ai";
import { IoIosSend } from "react-icons/io";

const ChatLayout = () => {
  return (
    <Grid
      {...maxWidthStyles_userPages}
      maxWidth={breakpoints["tablet"]}
      gridTemplateColumns="200px 1fr"
      gridGap={10}
      padding={8}
    >
      <Box as="aside" shadow="sm">
        <Box background="accent.1" padding={3} roundedTop="md">
          <Heading fontSize="text.level3">Messaging</Heading>
        </Box>
      </Box>

      <Box as="main" shadow="sm">
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
              <Text bold>John doe</Text>
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

        <Box height="65vh" overflowY="scroll"></Box>

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
