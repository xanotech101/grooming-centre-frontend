import {
  Box,
  Flex,
  Grid,
  GridItem,
  HStack,
  Icon,
  Stack,
} from "@chakra-ui/react";
import { Skeleton } from "@chakra-ui/skeleton";
import { Bar, Doughnut } from "react-chartjs-2";
import { Route } from "react-router-dom";
import { Button, Heading, SkeletonText, Text } from "../../components";
import { maxWidthStyles_userPages } from "../../theme/breakpoints";
import colors from "../../theme/colors";
import { useApp } from "../../contexts";
import useGradeDetails from "./Courses/Grades/hooks/useGradeDetails";
import { IoCalendarOutline } from "react-icons/io5";
import { BiNotepad } from "react-icons/bi";
import { ImFileText } from "react-icons/im";

const scheduledCards = [
  {
    title: "Upcoming Assesments",
    value: 3,
    icon: (
      <Icon fontSize="heading.h3" color="secondary.4">
        <BiNotepad />
      </Icon>
    ),
  },
  {
    title: "Lessons to complete",
    value: 2,
    icon: (
      <Icon fontSize="heading.h3" color="secondary.4">
        <ImFileText />
      </Icon>
    ),
  },
  {
    title: "Events to attend",
    value: 4,
    icon: (
      <Icon fontSize="heading.h3" color="secondary.4">
        <IoCalendarOutline />
      </Icon>
    ),
  },
];

const hoursSpentChartConfig = {
  data: {
    labels: [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ],
    datasets: [
      {
        label: "# of Votes",
        data: [12, 10, 3, 8, 5, 15, 12],
        backgroundColor: [colors.primary.base],
        borderWidth: 0,
      },
    ],
  },

  options: {
    plugins: {
      legend: { display: false },
    },
    scales: {
      y: {
        max: 24,
      },
    },
  },
};

const DashboardPage = () => {
  const appManager = useApp();
  const manager = useGradeDetails();

  const { grades, isLoading } = manager;
  console.log(grades);

  const notStarted =
    grades?.overview.totalCoursesCount -
    (grades?.ongoingCourses.length + grades?.completedCourses.length);

  const totalCourseChartConfig = {
    data: {
      labels: ["In Progress", "Completed", "Yet to start"],
      datasets: [
        {
          data: [
            grades?.ongoingCourses.length,
            grades?.completedCourses.length,
            notStarted,
          ],
          backgroundColor: [
            colors.secondary[3],
            colors.primary.base,
            colors.accent[1],
          ],
          borderWidth: 0,
        },
      ],
    },

    options: {
      plugins: {
        legend: {
          position: "right",
        },
      },
    },
  };

  const totalGrade = Math.round(
    (grades?.overview.averageAttendanceScore +
      grades?.overview.averageAssessmentScore +
      grades?.overview.averageExaminationScore) /
      3
  );

  const totalGradeChartConfig = {
    data: {
      labels: ["Total grade", ""],
      datasets: [
        {
          data: [totalGrade, Math.round(100 - totalGrade)],
          backgroundColor: [colors.others[2], colors.accent[1]],
          borderWidth: 0,
        },
      ],
    },

    options: {
      plugins: {
        legend: { display: false },
      },
    },
  };

  return (
    <Stack
      spacing={16}
      padding={{ base: 2, laptop: 5 }}
      {...maxWidthStyles_userPages}
    >
      <Flex
        flexDirection={{ base: "column", laptop: "row" }}
        alignItems={{ base: "flex-start", laptop: "center" }}
        justifyContent="space-between"
      >
        <Box
          // paddingTop={{ base: 10, "laptop": 0 }}
          // paddingBottom={{ base: 10, "laptop": 0 }}
          paddingY={{ base: 10, laptop: 0 }}
        >
          <Heading as="h1" fontSize="heading.h2" color="primary.base">
            {`Hi ${appManager.state.user?.firstName}!`}
          </Heading>
          <Text bold as="level1" color="accent.3">
            Welcome back, nice to see you again!
          </Text>
        </Box>

        <Flex
          justifyContent="space-between"
          alignItems="center"
          background="primary.base"
          rounded="10px"
          padding={{ base: 4, "laptop-l": 5 }}
          width="700px"
          height="175px"
        >
          <Text
            bold
            fontSize="heading.h3"
            color="white"
            width={{ base: "270px", "laptop-l": "340px" }}
          >
            Here is what you have scheduled for Today.
          </Text>

          <HStack spacing={2}>
            {scheduledCards.map(({ icon, title, value }) => (
              <Flex
                key={title}
                flexDirection="column"
                justifyContent="center"
                alignItems="center"
                boxSize={{ base: "100px", "laptop-l": "110px" }}
                rounded="5px"
                backgroundColor="white"
                shadow="md"
              >
                <Flex
                  flexDirection="column"
                  justifyContent="space-between"
                  boxSize="80px"
                >
                  <Flex alignItems="center">
                    <Text bold fontSize="heading.h3" paddingRight={4}>
                      {value}
                    </Text>
                    {icon}
                  </Flex>

                  <Text color="accent.3" bold>
                    {title}
                  </Text>
                </Flex>
              </Flex>
            ))}
          </HStack>
        </Flex>
      </Flex>

      <Flex>
        <Section title="Overview" flex={1} marginRight={10}>
          <Grid columnGap={4} rowGap={10}>
            {/* First Row */}
            <MiniBox
              padding={8}
              as={GridItem}
              colSpan={2}
              display="flex"
              flexDirection="column"
              height="300px"
            >
              <Box>
                <Text color="accent.3" bold>
                  Average Grade
                </Text>

                <Flex alignItems="center">
                  {isLoading ? (
                    <SkeletonText numberOfLines={1} />
                  ) : (
                    <Text bold as="level1" marginRight={2}>
                      {`${totalGrade}%`}
                    </Text>
                  )}
                </Flex>
              </Box>

              <Flex width="170px" height="170px" position="absolute" top="98px">
                <Doughnut {...totalGradeChartConfig} />
                <Flex flexDirection="column" position="absolute" left="300px">
                  <Box paddingBottom={4}>
                    {isLoading ? (
                      <SkeletonText numberOfLines={2} />
                    ) : (
                      <>
                        <Text color="accent.3">Assessments</Text>
                        <Text
                          bold
                        >{`${grades?.overview.averageAssessmentScore}%`}</Text>
                      </>
                    )}
                  </Box>
                  <Box paddingBottom={4}>
                    {isLoading ? (
                      <SkeletonText numberOfLines={2} />
                    ) : (
                      <>
                        <Text color="accent.3">Attendance</Text>
                        <Text
                          bold
                        >{`${grades?.overview.averageAttendanceScore}%`}</Text>
                      </>
                    )}
                  </Box>
                  <Box>
                    {isLoading ? (
                      <SkeletonText numberOfLines={2} width={100} />
                    ) : (
                      <>
                        <Text color="accent.3">Examination</Text>
                        <Text
                          bold
                        >{`${grades?.overview.averageExaminationScore}%`}</Text>
                      </>
                    )}
                  </Box>
                </Flex>
              </Flex>
            </MiniBox>

            <MiniBox
              padding={8}
              as={GridItem}
              colSpan={2}
              display="flex"
              flexDirection="column"
              height="300px"
            >
              <Box>
                <Text color="accent.3" bold>
                  Total Courses
                </Text>

                <Flex alignItems="center">
                  <Text bold as="level1" marginRight={2}>
                    {grades?.overview.totalCoursesCount}
                  </Text>

                  <Text as="level5" color="accent.5" m>
                    +1 New
                  </Text>
                </Flex>
              </Box>

              {/* <Grid placeItems="center"> */}
              <Box
                width="300px"
                height="300px"
                position="absolute"
                left="50%"
                transform="translate(-50%)"
              >
                <Doughnut {...totalCourseChartConfig} />
              </Box>
              {/* </Grid> */}
            </MiniBox>

            {/* Second Row */}
            <MiniBox
              padding={8}
              as={GridItem}
              colSpan={4}
              display="flex"
              flexDirection="column"
              minHeight="300px"
            >
              <Box marginBottom={5}>
                <Text color="accent.3" bold>
                  Hours Spent
                </Text>

                <Flex alignItems="center">
                  <Text bold as="level1" marginRight={2}>
                    22h 40min
                  </Text>

                  <Text as="level5" color="secondary.4" m>
                    +1 New
                  </Text>
                </Flex>
              </Box>

              <Grid placeItems="center">
                <Box
                  width="600px"
                  // position="absolute"
                  // left="50%"
                  // transform="translateX(-50%)"
                >
                  <Bar {...hoursSpentChartConfig} />
                </Box>
              </Grid>
            </MiniBox>
          </Grid>
        </Section>

        <Section title="Calendar" flexBasis="374px">
          <MiniBox
            as={Skeleton}
            flex={1}
            minHeight="386px"
            marginBottom={7}
          ></MiniBox>
          <MiniBox as={Skeleton} flex={1} minHeight="386px"></MiniBox>
        </Section>
      </Flex>

      {/* <Section title="Ongoing Courses" titleSeeAllHref="#">
        <CoursesRowLayout />
      </Section> */}

      {/* <Section title="Completed Courses" titleSeeAllHref="#">
        <CoursesRowLayout />
      </Section> */}
    </Stack>
  );
};

const MiniBox = ({ children, ...rest }) => {
  return (
    <Box
      shadow="0px 2px 4px rgba(0, 0, 0, 0.2)"
      border="1px"
      borderColor="#fafafa"
      rounded="8px"
      overflow="hidden"
      position="relative"
      {...rest}
    >
      {children}
    </Box>
  );
};

const Section = ({ title, titleSeeAllHref, children, ...rest }) => {
  return (
    <Box as="section" {...rest}>
      <Flex
        as="header"
        justifyContent="space-between"
        alignItems="center"
        marginBottom={5}
      >
        <Heading fontSize="heading.h3">{title}</Heading>

        {titleSeeAllHref && (
          <Button
            link={titleSeeAllHref}
            sm
            color="primary.base"
            backgroundColor="transparent"
            _hover={{ backgroundColor: "secondary.1" }}
          >
            See All
          </Button>
        )}
      </Flex>

      {children}
    </Box>
  );
};

export const DashboardPageRoute = ({ ...rest }) => {
  return <Route {...rest} render={(props) => <DashboardPage {...props} />} />;
};
