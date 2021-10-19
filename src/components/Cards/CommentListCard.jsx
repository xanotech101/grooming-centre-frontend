import { Box, Flex, HStack, Stack } from "@chakra-ui/layout";
import PropTypes from "prop-types";
import { AiOutlineDislike, AiOutlineLike } from "react-icons/ai";
import { FiChevronsDown, FiCornerDownRight } from "react-icons/fi";
import { HiDotsVertical } from "react-icons/hi";
import { Button, Image, Text } from "..";
import thumbnailPlaceholder from "../../assets/images/onboarding1.png";
import { capitalizeWords } from "../../utils";

export const CommentListCard = ({
  id,
  questionId,
  createdAt,
  body,
  replyCount,
  likes,
  dislikes,
  user,
}) => {
  return (
    <Stack
      paddingY={3}
      paddingX={6}
      spacing={3}
      shadow="2px 1px 5px rgba(0, 0, 0, 0.15)"
      margin={1}
      marginBottom={5}
      borderLeft="5px solid"
      borderColor="accent.7"
    >
      <Flex alignItems="center" justifyContent="space-between" marginBottom={2}>
        <HStack spacing={5}>
          <Image
            src={user?.profilePics || thumbnailPlaceholder}
            boxSize="30px"
            rounded="full"
          />

          <Box flex={1}>
            <Text bold>{capitalizeWords(user.fullName)}</Text>
            <Text as="level5" color="accent.3">
              {createdAt}
            </Text>
          </Box>
        </HStack>

        <Button asIcon ghost fontSize="text.level3">
          <HiDotsVertical />
        </Button>
      </Flex>

      <Text paddingBottom={2}>{body}</Text>

      <Flex
        justifyContent="space-between"
        alignItems="center"
        borderTop="1px"
        borderColor="accent.1"
        paddingTop={2}
      >
        <HStack spacing={3}>
          <PlainButtonWithIcon text={likes} icon={<AiOutlineLike />} />

          <PlainButtonWithIcon text={dislikes} icon={<AiOutlineDislike />} />
        </HStack>

        <HStack spacing={3}>
          <PlainButtonWithIcon
            color="accent.6"
            text={`Show All Replies (${replyCount})`}
            icon={<FiChevronsDown />}
          />

          <PlainButtonWithIcon
            color="accent.6"
            text="Reply"
            icon={<FiCornerDownRight />}
          />
        </HStack>
      </Flex>
    </Stack>
  );
};

const PlainButtonWithIcon = ({ icon, text, ...rest }) => (
  <Flex {...rest} alignItems="center" as="button">
    {icon}

    <Text as="level5" marginLeft={1}>
      {text}
    </Text>
  </Flex>
);

CommentListCard.propTypes = {
  id: PropTypes.string,
  questionId: PropTypes.string,
  body: PropTypes.string,
  createdAt: PropTypes.string,
  replyCount: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  likes: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  dislikes: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  user: PropTypes.shape({
    id: PropTypes.string,
    profilePics: PropTypes.string,
    fullName: PropTypes.string,
  }),
};
