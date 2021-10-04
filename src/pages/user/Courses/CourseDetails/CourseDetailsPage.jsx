import Icon from "@chakra-ui/icon";
import { Box, Flex, HStack, Stack } from "@chakra-ui/layout";
import { BsClockFill, BsFillCaretUpFill } from "react-icons/bs";
import { FaCalendar } from "react-icons/fa";
import { IoVideocam } from "react-icons/io5";
import { VscFiles } from "react-icons/vsc";
import { Route } from "react-router-dom";
import coverImagePlaceholder from "../../../../assets/images/onboarding1.png";
import { Button, Heading, Image, Spinner, Text } from "../../../../components";
import { useFakeLoading } from "../../../../hooks";
import breakpoints from "../../../../theme/breakpoints";
import { getDuration } from "../../../../utils";
import useAccordion from "./hooks/useAccordion";

const courseData = {
  id: "1234567890098765421",
  title: "Web Design & Development Crash Course 2021",
  description:
    "Ever wondered how other UX designers troubleshoot problems and juggle conflicting priorities? In this weekly series, Drew Bridewell—a user experience designer and leader of the digital transformation team at InVision—shares his hard-earned knowledge and shows how to apply basic UX design principles to real-world projects.",
  instructor: {
    image: null,
    name: "Travis Green",
  },
  details: {
    duration: 610,
    startTime: "<startTime>",
    endDate: "<endDate>",
  },
  lessons: [
    {
      id: "123454321",
      disabled: false,
      title: "Why this course?",
      duration: 610,
      startTime: "<startTime>",
      endTime: "<endTime>",
      lessonType: {
        id: "232",
        name: "video",
      },
    },
    {
      id: "098765678s",
      disabled: false,
      title: "Introduction to HTML",
      duration: 610,
      startTime: "<startTime>",
      endTime: "<endTime>",
      lessonType: {
        id: "232",
        name: "video",
      },
    },
    {
      id: "536hs5272",
      disabled: true,
      title: "Resources: Consume this contents",
      duration: 610,
      startTime: "<startTime>",
      endTime: "<endTime>",
      lessonType: {
        id: "232",
        name: "video",
      },
    },
  ],
  // assessment: {

  // }
}; // TODO: remove fake data

const CourseDetailsPage = () => {
  const { title, description, instructor, details, lessons } = courseData;
  const isLoading = useFakeLoading(600);
  const duration = getDuration(details.duration);

  return isLoading ? (
    <Flex
      // Make the height 100% of the screen minus the `height` of the Header and Footer
      height="calc(100vh - 200px)"
      justifyContent="center"
      alignItems="center"
    >
      <Spinner />
    </Flex>
  ) : (
    <Box>
      <Stack
        as="section"
        padding={10}
        spacing={7}
        backgroundColor="secondary.9"
        color="white"
        marginBottom={10}
      >
        <Heading>{title}</Heading>
        <Text as="level2">{description}</Text>

        <HStack spacing={4}>
          <Image
            src={instructor.image || coverImagePlaceholder}
            rounded="full"
            boxSize="40px"
          />

          <Text as="level1" bold>
            {instructor.name}
          </Text>
        </HStack>
      </Stack>

      <Box
        padding={5}
        minHeight="50vh"
        maxWidth={breakpoints.laptop}
        marginX="auto"
      >
        <Flex justifyContent="flex-end" marginBottom={10}>
          <Button
            link={`/courses/take/${courseData.id}/lessons/${courseData.lessons[0].id}`}
          >
            Take Course
          </Button>
        </Flex>

        <Accordion heading="Course Details">
          <Flex justifyContent="space-between" padding={2}>
            <InfoContent
              title="Duration"
              date={`${duration.hours} hours ${duration.minutes} minutes`}
              icon={<BsClockFill />}
            />
            <InfoContent
              title="Start Date"
              date={details.startTime}
              icon={<FaCalendar />}
            />
            <InfoContent
              title="End Date"
              date={details.endDate}
              icon={<FaCalendar />}
            />
          </Flex>
        </Accordion>

        <Accordion heading="Course Lessons">
          {lessons.map((lesson, index) => {
            const duration = getDuration(lesson.duration);

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
                  title={lesson.startTime}
                  date={`${lesson.startTime} to ${lesson.endTime}`}
                  icon={<FaCalendar />}
                  flex={0.6}
                  opacity={lesson.disabled ? 0.5 : 1}
                />
                <InfoContent
                  title={lesson.title}
                  date={`${duration.hours} hours ${duration.minutes} minutes`}
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
                  link={`/courses/take/${courseData.id}/lessons/${lesson.id}`}
                  secondary
                  sm
                  disabled={lesson.locked}
                >
                  View Lesson
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
