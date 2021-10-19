import { Box, Stack } from "@chakra-ui/layout";
import PropTypes from "prop-types";
import { Text } from "..";

export const ReplyListCard = ({ id, commentId, createdAt, body, user }) => {
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
    >
      <Text paddingBottom={2}>
        <b>@unkind</b>, Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        Ornare rutrum amet, a nunc mi lacinia in iaculis. Pharetra ut integer
        nibh urna.
      </Text>

      <Box
        borderTop="1px"
        borderColor="accent.1"
        color="accent.3"
        paddingTop={2}
      >
        by @lazyReplier
      </Box>
    </Stack>
  );
};

ReplyListCard.propTypes = {
  id: PropTypes.string,
  commentId: PropTypes.string,
  body: PropTypes.string,
  user: PropTypes.shape({
    id: PropTypes.string,
    profilePics: PropTypes.string,
    fullName: PropTypes.string,
  }),
};
