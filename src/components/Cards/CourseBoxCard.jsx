import { Box, Flex, HStack, Icon, Stack } from "@chakra-ui/react";
import { Skeleton, SkeletonText } from "@chakra-ui/skeleton";
import PropTypes from "prop-types";
import { AiFillBook } from "react-icons/ai";
import { BsFillClockFill } from "react-icons/bs";
import { Heading, Image, Link, Text } from "..";
import { getDuration } from "../../utils";
import coverImagePlaceholder from "../../assets/images/onboarding1.png";
import { useFakeLoading } from "../../hooks";

export const CourseBoxCard = ({
  coverImage,
  disabled,
  duration,
  id = "course_slug", // TODO: remove this line
  instructor,
  // isLoading = true,
  lessonCount,
  progress,
  title,
}) => {
  duration = getDuration(duration);

  const isLoading = useFakeLoading();

  return (
    <Link
      className={`course-box-card ${
        disabled ? "course-box-card--disabled" : ""
      }`}
      href={`/courses/details/${id}`}
    >
      {progress !== 0 && !isLoading ? (
        <Box
          backgroundColor="accent.5"
          position="absolute"
          zIndex={1}
          width={`${progress}%`}
          paddingY={1}
          textShadow="1px 1px 1.5px rgba(0, 0, 0, .5)"
        >
          <Text
            transform="translateX(10px)"
            as="level5"
            color="white"
            width="100px"
          >
            Progress {progress}%
          </Text>
        </Box>
      ) : null}

      <Image
        src={coverImage || coverImagePlaceholder}
        filter={disabled ? "sepia(10%)" : "none"}
        isLoading={isLoading}
        className="course-box-card__image"
        transitionDuration=".7s"
        transitionDelay=".5s"
        height={{ base: "150px" }}
        width="100%"
      />

      <Stack
        flex={1}
        justifyContent="space-between"
        padding={2}
        paddingBottom={4}
        spacing={5}
      >
        <HStack spacing={2}>
          <Image
            src={instructor.image || coverImagePlaceholder}
            isLoading={isLoading}
            boxSize="37px"
            rounded="full"
          />

          <Box flex={1}>
            {isLoading ? (
              <>
                <SkeletonText noOfLines={2} />
              </>
            ) : (
              <>
                <Text>{instructor.name}</Text>
                <Text as="level5" color="accent.3">
                  {instructor.role}
                </Text>
              </>
            )}
          </Box>
        </HStack>

        <Box flex={1}>
          {isLoading ? (
            <SkeletonText noOfLines={2} />
          ) : (
            <Heading as="h3" fontSize="h4">
              {title}
            </Heading>
          )}
        </Box>

        <Flex color="accent.3" justifyContent="space-between">
          {isLoading ? (
            <>
              <Skeleton height="7px" width="80px" />

              <Skeleton height="7px" width="80px" />
            </>
          ) : (
            <>
              <Flex alignItems="flex-end">
                <Icon fontSize="text.level1">
                  <AiFillBook />
                </Icon>
                <Text>{lessonCount} lessons</Text>
              </Flex>
              <Flex alignItems="flex-end">
                <Icon fontSize="text.level1">
                  <BsFillClockFill />
                </Icon>
                {/* TODO: convert minutes to hours and minutes */}
                <Text>
                  {duration.hours}hrs {duration.minutes}mins
                </Text>
              </Flex>
            </>
          )}
        </Flex>
      </Stack>
    </Link>
  );
};

CourseBoxCard.propTypes = {
  coverImage: PropTypes.string,
  disabled: PropTypes.bool,
  duration: PropTypes.number,
  id: PropTypes.string,
  isLoading: PropTypes.bool,
  lessonCount: PropTypes.number,
  progress: PropTypes.number,
  title: PropTypes.string,
  instructor: PropTypes.shape({
    image: PropTypes.string,
    name: PropTypes.string,
    role: PropTypes.string,
  }),
};
