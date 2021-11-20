import Icon from "@chakra-ui/icon";
import { Box, Flex, HStack, Stack } from "@chakra-ui/layout";
import { BsClockFill, BsFillCaretUpFill } from "react-icons/bs";
import { FaCalendar } from "react-icons/fa";
import { IoVideocam } from "react-icons/io5";
import { VscFiles } from "react-icons/vsc";
import { Route } from "react-router-dom";
import coverImagePlaceholder from "../../../../assets/images/User_CourseDetailsHeader.svg";
import avatarImagePlaceholder from "../../../../assets/images/Avatar.svg";
import { Button, Heading, Image, Spinner, Text } from "../../../../components";
import breakpoints, {
  maxWidthStyles_userPages,
} from "../../../../theme/breakpoints";
import {
  getDuration,
  hasEnded,
  isOngoing,
  isUpcoming,
} from "../../../../utils";
import useAccordion from "./hooks/useAccordion";
import useCourseDetails from "./hooks/useCourseDetails";
import { useEffect } from "react";
import dayjs from "dayjs";

const CourseDetailsPage = () => {
  const { courseDetails, fetchCourseDetails } = useCourseDetails();

  useEffect(() => {
    fetchCourseDetails();
  }, [fetchCourseDetails]);

  const courseDetailsData = courseDetails.data;
  const duration = getDuration(courseDetailsData?.duration).combinedText;

  const isLoading = courseDetails.loading;
  const isError = courseDetails.err;

  return isLoading || isError ? (
    <Flex
      // Make the height 100% of the screen minus the `height` of the Header and Footer
      height="calc(100vh - 200px)"
      justifyContent="center"
      alignItems="center"
    >
      {isLoading ? (
        <Spinner />
      ) : isError ? (
        <Heading color="red.500">{isError}</Heading>
      ) : null}
    </Flex>
  ) : (
    <Box>
      <Box
        as="section"
        padding={10}
        marginBottom={10}
        // backgroundColor="secondary.9"
        color="white"
        position="relative"
      >
        <Image
          src={courseDetailsData?.thumbnail || coverImagePlaceholder}
          width="100%"
          height="100%"
          top={0}
          left={0}
          position="absolute"
          alt="Course Header"
        />
        <Box
          width="100%"
          height="100%"
          top={0}
          left={0}
          position="absolute"
          backgroundColor="black"
          opacity={0.7}
        ></Box>

        <Stack
          spacing={7}
          position="relative"
          // zIndex={1}
          {...maxWidthStyles_userPages}
        >
          <Heading>{courseDetailsData?.title}</Heading>
          <Text as="level2">{courseDetailsData?.description}</Text>

          <HStack spacing={4}>
            <Image
              src={
                courseDetailsData?.user.profilePics || avatarImagePlaceholder
              }
              rounded="full"
              boxSize="40px"
            />

            <Text as="level1" bold>
              {`${courseDetailsData?.user.firstName} ${courseDetailsData?.user.lastName}`}
            </Text>
          </HStack>
        </Stack>
      </Box>

      <Box
        padding={5}
        minHeight="50vh"
        maxWidth={breakpoints.laptop}
        marginX="auto"
      >
        {/* <Flex justifyContent="flex-end" marginBottom={10}>
          <Button
            link={`/courses/take/${courseDetailsData?.id}/lessons/${courseDetailsData?.lessons[0].id}`}
            disabled={
              !isOngoing(
                courseDetailsData?.lessons[0].startTime,
                courseDetailsData?.lessons[0].endTime
              )
            }
          >
            Take Lesson
          </Button>
        </Flex> */}

        {/* {isOngoing(event.startTime, event.endTime) && "Join Event"}
              {hasEnded(event.endTime) && "Event Has Ended"}
              {isUpcoming(event.startTime) && "Event Is Upcoming"} */}

        <Accordion heading="Course Details">
          <Flex justifyContent="space-between" padding={2}>
            <InfoContent
              title="Duration"
              date={`${duration}`}
              icon={<BsClockFill />}
            />
            <InfoContent
              title="Start Date"
              date={dayjs(courseDetailsData?.startTime).format(
                "ddd, MMM D, YYYY"
              )}
              icon={<FaCalendar />}
            />
            <InfoContent
              title="End Date"
              date={dayjs(courseDetailsData?.endTime).format(
                "ddd, MMM D, YYYY"
              )}
              icon={<FaCalendar />}
            />
          </Flex>
        </Accordion>

        <Accordion heading="Course Lessons">
          {courseDetailsData?.lessons.map((lesson, index) => {
            const duration = getDuration(lesson.duration).combinedText;

            return (
              <Flex
                key={index}
                justifyContent="space-between"
                paddingY={3}
                paddingX={2}
                borderBottom="1px"
                borderColor="accent.1"
              >
                <InfoContent
                  title={dayjs(lesson.startTime).format("ddd, D MMM")}
                  date={`${dayjs(lesson.startTime).format("h:mm A")} to ${dayjs(
                    lesson.endTime
                  ).format("h:mm A")}`}
                  icon={<FaCalendar />}
                  flex={0.6}
                  opacity={lesson.disabled ? 0.5 : 1}
                />
                <InfoContent
                  title={lesson.title}
                  date={`${duration}`}
                  icon={
                    lesson.lessonType.name !== "video" ? (
                      <VscFiles />
                    ) : (
                      <IoVideocam />
                    )
                  }
                  flex={1}
                  marginLeft={16}
                  opacity={lesson.disabled ? 0.5 : 1}
                />

                <Button
                  link={`/courses/take/${courseDetailsData?.id}/lessons/${lesson.id}`}
                  width="150px"
                  secondary
                  sm
                  disabled={!isOngoing(lesson.startTime, lesson.endTime)}
                >
                  {isOngoing(lesson.startTime, lesson.endTime) && "Take Lesson"}
                  {hasEnded(lesson.endTime) && "Lesson Has Ended"}
                  {isUpcoming(lesson.startTime) && "Lesson Is Upcoming"}
                </Button>
              </Flex>
            );
          })}
        </Accordion>
      </Box>
    </Box>
  );
};

const Accordion = ({ heading, children }) => {
  const accordionManager = useAccordion();

  return (
    <Box as="section" marginBottom={7}>
      <Flex
        as="header"
        backgroundColor="secondary.7"
        color="white"
        paddingX={8}
        paddingY={3}
        rounded="5px"
        justifyContent="space-between"
        alignItems="center"
        onClick={accordionManager.handleToggle}
        cursor="pointer"
      >
        <Heading as="h4">{heading}</Heading>

        <Icon
          fontSize="text.level1"
          transition=".15s"
          transform={`rotate(${!accordionManager.isOpen ? 180 : 0}deg)`}
          transformOrigin="center"
        >
          <BsFillCaretUpFill />
        </Icon>
      </Flex>

      <Box
        overflowY="hidden"
        transition=".5s"
        maxHeight={accordionManager.isOpen ? "1000px" : "0px"}
      >
        {children}
      </Box>
    </Box>
  );
};

const InfoContent = ({ date, icon, title, ...rest }) => {
  return (
    <HStack spacing={1} alignItems="flex-start" {...rest}>
      <Box paddingTop="1px">
        <Icon fontSize="text.level1">{icon}</Icon>
      </Box>

      <Box>
        <Text bold>{title}</Text>
        <Text as="level5" color="accent.3">
          {date}
        </Text>
      </Box>
    </HStack>
  );
};

export const CourseDetailsPageRoute = ({ ...rest }) => {
  return (
    <Route {...rest} render={(props) => <CourseDetailsPage {...props} />} />
  );
};
