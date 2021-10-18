import { Box, Flex, HStack, Stack } from "@chakra-ui/layout";
import PropTypes from "prop-types";
import { HiDotsVertical } from "react-icons/hi";
import { Button, Image, SelectedTags, SkeletonText, Text } from "..";
import thumbnailPlaceholder from "../../assets/images/onboarding1.png";
import { capitalizeWords } from "../../utils";

export const QuestionListCard = ({
  id,
  title,
  body,
  tags,
  user,
  isLoading,
  createdAt,
}) => {
  return (
    <Stack
      rounded={"5px"}
      shadow="2px 1px 5px rgba(0, 0, 0, 0.15)"
      margin={1}
      marginBottom={7}
      padding={6}
      spacing={4}
    >
      <Flex alignItems="center" justifyContent="space-between" marginBottom={2}>
        <HStack spacing={5}>
          <Image
            src={user?.profilePics || thumbnailPlaceholder}
            isLoading={isLoading}
            boxSize="37px"
            rounded="full"
          />

          <Box flex={1}>
            {isLoading ? (
              <>
                <SkeletonText numberOfLines={2} />
              </>
            ) : (
              <>
                <Text bold>{capitalizeWords(user.fullName)}</Text>
                <Text as="level5" color="accent.3">
                  {createdAt}
                </Text>
              </>
            )}
          </Box>
        </HStack>

        <Button asIcon ghost>
          <HiDotsVertical />
        </Button>
      </Flex>

      <Text bold as="level3">
        {title}
      </Text>

      <Text>{body}</Text>

      <SelectedTags tags={tags} />
    </Stack>
  );
};

QuestionListCard.propTypes = {
  id: PropTypes.string,
  title: PropTypes.string,
  body: PropTypes.string,
  createdAt: PropTypes.string,
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
