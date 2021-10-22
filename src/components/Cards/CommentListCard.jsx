import { Box, Flex, HStack, Stack } from "@chakra-ui/layout";
import PropTypes from "prop-types";
import { useState } from "react";
import { AiOutlineDislike, AiOutlineLike } from "react-icons/ai";
import { FiChevronsDown, FiCornerDownRight, FiMenu } from "react-icons/fi";
import { Image, Link, Text } from "..";
import { ForumMessageCardMoreIconButton } from "./QuestionListCard";
import thumbnailPlaceholder from "../../assets/images/onboarding1.png";
import { capitalizeWords, formatToUsername, getFullName } from "../../utils";
import CommentForm from "../../pages/user/Forum/Comments/CommentForm";

const useCommentListCard = () => {
  const [displayReplyForm, setDisplayReplyForm] = useState(false);

  const handleDisplayReplyForm = () => setDisplayReplyForm(true);
  const handleHideReplyForm = () => setDisplayReplyForm(true);

  return {
    displayReplyForm,
    handleDisplayReplyForm,
    handleHideReplyForm,
  };
};

export const CommentListCard = ({
  id,
  questionId,
  createdAt,
  body,
  replyCount,
  likes,
  dislikes,
  user,
  onReplySuccess,
  onReplyToggle,
  displayReplies,
  noBorder,
  replyingToUser,
}) => {
  const { displayReplyForm, handleDisplayReplyForm } = useCommentListCard();

  return (
    <Stack
      paddingY={3}
      paddingX={6}
      spacing={3}
      shadow="2px 1px 5px rgba(0, 0, 0, 0.15)"
      margin={1}
      marginBottom={5}
      borderLeft={!noBorder && "5px solid"}
      borderColor="accent.7"
    >
      <Box>
        <Flex
          alignItems="center"
          justifyContent="space-between"
          marginBottom={2}
        >
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

          <ForumMessageCardMoreIconButton context="reply" />
        </Flex>
        {replyingToUser && (
          <Text opacity={0.8}>
            Replying to{" "}
            <Box as="b" color="secondary.6">
              {formatToUsername(getFullName(replyingToUser))}
            </Box>
          </Text>
        )}
      </Box>

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
          {questionId && (
            <PlainButtonWithIcon
              color="accent.6"
              text={"View question"}
              icon={<FiMenu />}
              link={`/forum/questions/details/${questionId}`}
            />
          )}

          {replyCount ? (
            <PlainButtonWithIcon
              color="accent.6"
              text={`${
                displayReplies ? "Hide" : "Show"
              } All Replies (${replyCount})`}
              icon={<FiChevronsDown />}
              onClick={onReplyToggle}
            />
          ) : null}

          <PlainButtonWithIcon
            color="accent.6"
            text="Reply"
            icon={<FiCornerDownRight />}
            onClick={handleDisplayReplyForm}
          />
        </HStack>
      </Flex>

      {displayReplyForm && (
        <CommentForm isReply onReplySuccess={onReplySuccess} commentId={id} />
      )}
    </Stack>
  );
};

const PlainButtonWithIcon = ({ icon, text, link, ...rest }) => {
  const renderContent = () => (
    <Flex {...rest} alignItems="center" as={!link && "button"}>
      {icon}

      <Text as="level5" marginLeft={1}>
        {text}
      </Text>
    </Flex>
  );

  return link ? <Link href={link}> {renderContent()}</Link> : renderContent();
};

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
  replyingToUser: PropTypes.object,
  onReplyToggle: PropTypes.func,
  displayReplies: PropTypes.bool,
  onReplySuccess: PropTypes.func,
  noBorder: PropTypes.bool,
};
