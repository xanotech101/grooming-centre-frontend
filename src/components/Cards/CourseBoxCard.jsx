import { Image } from "@chakra-ui/image";
import { Box, Flex, HStack, Icon, Stack } from "@chakra-ui/react";
import { Skeleton, SkeletonText } from "@chakra-ui/skeleton";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { AiFillBook } from "react-icons/ai";
import { BsFillClockFill } from "react-icons/bs";
import { Heading, Link, Text } from "..";
import { getDuration } from "../../utils";
import coverImagePlaceholder from "../../assets/images/onboarding1.png";

export const CourseBoxCard = ({
  coverImage,
  disabled,
  duration,
  instructor,
  // isLoading = true,
  lessonCount,
  progress,
  title,
}) => {
  duration = getDuration(duration);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  return (
    <Link
      className={`course-box-card ${
        disabled ? "course-box-card--disabled" : ""
      }`}
    >
      <Flex
        overflow="hidden"
        height={{ base: "150px" }}
        className="cover-image"
        transitionDuration=".7s"
        transitionDelay=".5s"
      >
        {isLoading ? (
          <Skeleton width="100%" />
        ) : (
          <Image
            filter={disabled ? "sepia(10%)" : "none"}
            src={coverImage || coverImagePlaceholder}
            width="100%"
            objectFit="cover"
          />
        )}
      </Flex>

      <Stack
        flex={1}
        justifyContent="space-between"
        padding={2}
        paddingBottom={4}
        spacing={5}
      >
        <HStack spacing={2}>
          <Flex overflow="hidden" boxSize="37px" rounded="full">
            {isLoading ? (
              <Skeleton width="100%" />
            ) : (
              <Image
                src={instructor.image || coverImagePlaceholder}
                objectFit="cover"
              />
            )}
          </Flex>

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
  duration: PropTypes.number.isRequired,
  isLoading: PropTypes.bool,
  lessonCount: PropTypes.number.isRequired,
  progress: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,

  instructor: PropTypes.shape({
    image: PropTypes.string,
    name: PropTypes.string,
    role: PropTypes.string,
  }).isRequired,
};
