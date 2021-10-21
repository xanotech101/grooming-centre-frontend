import Icon from "@chakra-ui/icon";
import { Box, Flex, HStack, Stack } from "@chakra-ui/layout";
import PropTypes from "prop-types";
import { BiComment } from "react-icons/bi";
import { HiDotsVertical } from "react-icons/hi";
import { Button, Image, Link, SelectedTags, Text } from "..";
import thumbnailPlaceholder from "../../assets/images/onboarding1.png";
import { capitalizeWords } from "../../utils";

export const QuestionListCard = ({
  id,
  title,
  body,
  commentCount,
  tags,
  user,
  disabled,
  createdAt,
}) => {
  const boxStyle = {
    boxShadow: "2px 1px 5px rgba(0, 0, 0, 0.15)",
    margin: "4px",
    marginBottom: "28px",
    display: "block",
    borderRadius: "5px",
  };

  // return disabled ? (
  //   renderCard()
  // ) : (
  //   <Link href={`/forum/questions/details/${id}`} style={boxStyle}>
  //     {renderCard()}
  //   </Link>
  // );

  return (
    <Stack
      padding={6}
      spacing={4}
      {...boxStyle}
      position="relative"
      _hover={
        !disabled && {
          transform: "scale(1.005)",
          cursor: "pointer",
        }
      }
    >
      {!disabled && (
        <Link
          href={`/forum/questions/details/${id}`}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
          }}
        ></Link>
      )}

      <Flex alignItems="center" justifyContent="space-between" marginBottom={2}>
        <HStack spacing={5}>
          <Image
            src={user?.profilePics || thumbnailPlaceholder}
            boxSize="40px"
            rounded="full"
          />

          <Box flex={1}>
            <Text bold>{capitalizeWords(user.fullName)}</Text>
            <Text as="level5" color="accent.3">
              {createdAt}
            </Text>
          </Box>
        </HStack>

        <Button asIcon ghost position="relative" zIndex={1}>
          <HiDotsVertical />
        </Button>
      </Flex>

      <Text bold as="level3">
        {title}
      </Text>

      <Text>{body}</Text>

      <Flex justifyContent="space-between" alignItems="center">
        <SelectedTags tags={tags} />

        <Flex>
          <Icon fontSize="heading.h4" transform="translateY(3px)">
            <BiComment />
          </Icon>

          <Text>{commentCount}</Text>
        </Flex>
      </Flex>
    </Stack>
  );
};

QuestionListCard.propTypes = {
  id: PropTypes.string,
  title: PropTypes.string,
  body: PropTypes.string,
  createdAt: PropTypes.string,
  commentCount: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  tags: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      label: PropTypes.string,
    })
  ),
  user: PropTypes.shape({
    id: PropTypes.string,
    profilePics: PropTypes.string,
    fullName: PropTypes.string,
  }),
};
