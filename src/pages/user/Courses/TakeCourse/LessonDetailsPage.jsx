import { Box, Flex, Icon, Grid } from "@chakra-ui/react";
import { Skeleton } from "@chakra-ui/skeleton";
import { FaPause, FaPlay } from "react-icons/fa";
import ReactPlayer from "react-player/lazy";
import { Route } from "react-router-dom";
import { Button, Heading, SkeletonText } from "../../../../components";
import useLessonDetails from "./hooks/useLessonDetails";

const Player = ({
  width = "100%",
  height = "100%",
  backgroundColor,
  url,
  onEnded,
  onPlayToggle,
  controls,
  playing = false,
  ...rest
}) => {
  return (
    <Box
      width={width}
      height={height}
      backgroundColor={backgroundColor}
      position="relative"
      {...rest}
    >
      <Flex
        justifyContent="center"
        alignItems="center"
        position="absolute"
        zIndex={1}
        top={0}
        left={0}
        width="100%"
        height="100%"
        cursor="pointer"
        sx={{
          [!playing && "&:hover .icon"]: {
            opacity: 1,
          },
        }}
        onClick={onPlayToggle}
      >
        <Grid
          opacity={0}
          transition=".5s"
          className="icon"
          placeItems="center"
          width="50px"
          height="50px"
          // padding={5}
          rounded="full"
          backgroundColor={"white"}
        >
          <Icon
            color="black"
            fontSize="heading.h3"
            transform={!playing && "translateX(2px)"}
          >
            {playing ? <FaPause /> : <FaPlay />}
          </Icon>
        </Grid>
      </Flex>

      <ReactPlayer
        url={url}
        onEnded={onEnded}
        playing={playing}
        controls={controls}
        width="100%"
        height="100%"
      />
    </Box>
  );
};

const LessonDetailsPage = ({ sidebarLinks }) => {
  const manager = useLessonDetails(sidebarLinks);
  const {
    lesson,
    isLoading,
    error,
    completeAndContinueIsDisabled,
    previousIsDisabled,
    videoHasBeenCompleted,
    videoIsPlaying,
    handlePrevious,
    handleCompleteAndContinue,
    handleVideoHasEnded,
    handleVideoPlayToggle,
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
        {error ? (
          <Heading as="h3">{error}</Heading>
        ) : (
          <>
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
                <Player
                  url={lesson?.file}
                  onEnded={handleVideoHasEnded}
                  onPlayToggle={handleVideoPlayToggle}
                  controls={videoHasBeenCompleted}
                  playing={videoIsPlaying}
                />
              )}
            </Box>

            <Box>
              {isLoading ? (
                <SkeletonText numberOfLines={10} />
              ) : (
                lesson?.content
              )}
            </Box>
          </>
        )}
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
