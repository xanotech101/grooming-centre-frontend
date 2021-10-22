import { Box, Stack } from "@chakra-ui/layout";
import PropTypes from "prop-types";
import { useEffect, useRef } from "react";
import { Text } from "..";
import { formatToUsername } from "../../utils";

export const ReplyListCard = ({ id, body, user }) => {
  const wrapperRef = useRef();

  useEffect(() => {
    wrapperRef.current.focus();
  }, []);

  return (
    <Stack
      paddingY={3}
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

      <Box
        borderTop="1px"
        borderColor="accent.1"
        color="accent.3"
        paddingTop={2}
      >
        <Text>
          by <b>{formatToUsername(user.fullName)}</b>
        </Text>
      </Box>
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
