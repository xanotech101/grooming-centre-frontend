import { Box, Flex } from "@chakra-ui/react";
import { Skeleton } from "@chakra-ui/skeleton";
import ReactPlayer from "react-player/lazy";
import { Route } from "react-router-dom";
import { Button, Heading, SkeletonText } from "../../../../components";
import useLessonDetails from "./hooks/useLessonDetails";

const LessonDetailsPage = ({ sidebarLinks }) => {
  const manager = useLessonDetails(sidebarLinks);
  const {
    lesson,
    isLoading,
    completeAndContinueIsDisabled,
    previousIsDisabled,
    handlePrevious,
    handleCompleteAndContinue,
  } = manager;

  return (
    <Flex flexDirection="column" flex={1} height="100vh">
      <Box as="header">
        <Flex
          justifyContent="space-between"
          borderBottom="1px"
          borderColor="accent.1"
        >
          <Button
            ghost
            flex={1}
            disabled={previousIsDisabled}
            onClick={handlePrevious}
          >
            Previous Lesson
          </Button>
          <Button
            ghost
            backgroundColor="primary.base"
            color="white"
            _hover={{ opacity: 0.8 }}
            flex={1}
            disabled={completeAndContinueIsDisabled}
            onClick={handleCompleteAndContinue}
          >
            Complete And Continue
          </Button>
        </Flex>
      </Box>

      <Box
        as="main"
        paddingTop={10}
        paddingBottom={16}
        paddingX={6}
        flex={1}
        overflowY="auto"
      >
        <Box marginBottom={10}>
          {isLoading ? (
            <SkeletonText />
          ) : (
            <Heading as="h1" fontSize="heading.h3">
              {lesson?.title}
            </Heading>
          )}
        </Box>

        <Box height="calc((100vw - 250px - 48px) / 2)" marginBottom={10}>
          {isLoading ? (
            <Skeleton width="100%" height="100%" />
          ) : (
            <Box width="100%" height="100%" backgroundColor="accent.2">
              <ReactPlayer
                url="https://www.youtube.com/watch?v=ysz5S6PUM-U"
                width="100%"
                height="100%"
              />
            </Box>
          )}
        </Box>

        <Box>
          {isLoading ? <SkeletonText numberOfLines={10} /> : lesson?.content}
        </Box>
      </Box>
    </Flex>
  );
};

export const LessonDetailsPageRoute = ({ sidebarLinks, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) => (
        <LessonDetailsPage sidebarLinks={sidebarLinks} {...props} />
      )}
    />
  );
};
