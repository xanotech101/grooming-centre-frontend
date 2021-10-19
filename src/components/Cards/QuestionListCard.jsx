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
  // isLoading,
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

  const renderCard = () => (
    <Stack
      padding={6}
      spacing={4}
      {...(disabled ? boxStyle : {})}
      _hover={
        !disabled && {
          transform: "scale(1.005)",
          cursor: "pointer",
        }
      }
    >
      <Flex alignItems="center" justifyContent="space-between" marginBottom={2}>
        <HStack spacing={5}>
          <Image
            src={user?.profilePics || thumbnailPlaceholder}
            // isLoading={isLoading}
            boxSize="37px"
            rounded="full"
          />

          <Box flex={1}>
            {/* {isLoading ? (
          <>
            <SkeletonText numberOfLines={2} />
          </>
        ) : (
          <> */}
            <Text bold>{capitalizeWords(user.fullName)}</Text>
            <Text as="level5" color="accent.3">
              {createdAt}
            </Text>
            {/* </>
        )
        } */}
          </Box>
        </HStack>

        <Button asIcon ghost link="#">
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

  return disabled ? (
    renderCard()
  ) : (
    <Link href={`/forum/questions/details/${id}`} style={boxStyle}>
      {renderCard()}
    </Link>
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
