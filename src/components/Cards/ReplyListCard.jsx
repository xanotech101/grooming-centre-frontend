import { Flex, Stack } from "@chakra-ui/layout";
import PropTypes from "prop-types";
import { useEffect, useRef } from "react";
import { ForumMessageCardMoreIconButton, Text } from "..";
import { useLoggedInUserIsTheCreator } from "../../hooks";
import { formatToUsername } from "../../utils";

export const ReplyListCard = ({ id, body, user }) => {
  const wrapperRef = useRef();

  useEffect(() => {
    wrapperRef.current.focus();
  }, []);

  const showMoreIconButton = useLoggedInUserIsTheCreator(user);

  return (
    <Stack
      paddingTop={3}
      paddingBottom={showMoreIconButton ? 1 : 3}
      paddingX={6}
      spacing={3}
      shadow="2px 1px 5px rgba(0, 0, 0, 0.15)"
      margin={1}
      marginBottom={5}
      borderLeft="10px solid"
      borderColor="accent.6"
      ref={wrapperRef}
      tabIndex={0}
    >
      <Text paddingBottom={2}>{body}</Text>

      <Flex
        borderTop="1px"
        borderColor="accent.1"
        color="accent.3"
        paddingTop={2}
        justifyContent="space-between"
      >
        <Text>
          by <b>{formatToUsername(user.fullName)}</b>
        </Text>

        {showMoreIconButton && (
          <ForumMessageCardMoreIconButton context="reply" />
        )}
      </Flex>
    </Stack>
  );
};

ReplyListCard.propTypes = {
  id: PropTypes.string,
  body: PropTypes.string,
  user: PropTypes.shape({
    id: PropTypes.string,
    fullName: PropTypes.string,
  }),
};
