import { Route } from "react-router-dom";
import { Box, Flex} from "@chakra-ui/layout";
import {
  CircularProgress,
  Center,
  ListItem,
  UnorderedList,
  Progress,
} from "@chakra-ui/react";
import { Doughnut } from "react-chartjs-2";
import { Heading, Text, Button } from "../../../../components";
import colors from "../../../../theme/colors";
import useCoursesOverviewDetails from "./hooks/useCoursesOverviewDetails";
import { PageLoaderLayout } from "../../../../layouts";

const totalCourseChartConfig = {
  data: {
    labels: ["Attendance", "Examination", "Attendance", ""],
    datasets: [
      {
        data: [20, 20, 20],
        backgroundColor: [colors.others[4], colors.others[3], colors.others[2]],
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

const PerformanceOverviewCard = ({
  title,
  percentage,
  numberOfCourses,
  progress,
  color,
}) => {
  return (
    <Box w="100%" borderRadius="12" bg="white" paddingX={16} paddingY={6}>
      <Flex flexDirection="row" justifyContent="space-between">
        <Box justifyContent="center" alignItems="center">
          <Text fontSize="20" fontWeight="700" color="accent.3">
            {title}
          </Text>
          <Text color="seondary.9" fontWeight="700" fontSize="36">
            {`${percentage}%`}
          </Text>
          <Text fontSize="14" color="accent.3">
            {numberOfCourses}
          </Text>
        </Box>
        <Center>
          <CircularProgress color={color} value={progress} size="80px" />
        </Center>
      </Flex>
    </Box>
  );
};

const CourseOverviewCard = ({
  courseTitle,
  duration,
  time,
  attendance,
  attendanceProgress,
  attendancePercentage,
  assessment,
  assessmentPercentage,
  assessmentProgress,
  examination,
  examinationProgress,
  examinationPercentage,
  totalPercentage,
  children,
}) => {
  return (
    <Box
      mt={4}
      border="1px"
      borderColor="secondary.1"
      boxShadow="base"
      w="100%"
      p={8}
      mb={6}
    >
      <Flex flexDirection="row">
        <Box flex="1">
          <Text lineHeight="10" color="seondary.9" fontSize="20px">
            {courseTitle}
          </Text>
          <Flex color="accent.3" flexDirection="row">
            <Text fontSize="16px" pr="3">
              {duration}
            </Text>
            <UnorderedList>
              <ListItem>{time}</ListItem>
            </UnorderedList>
          </Flex>
          {children}
        </Box>
        <Box
          w="140px"
          mr={10}
          display="flex"
          flexDirection="column"
          justifyContent="center"
        >
          <Flex justifyContent="space-between">
            <Box>
              <Text color="accent.3">{attendance}</Text>
              <Progress
                colorScheme="whatsapp"
                size="xs"
                value={attendanceProgress}
              />
            </Box>
            <Text fontWeight="700" color="seondary.9" fontSize="18">
              {`${attendancePercentage}%`}
            </Text>
          </Flex>
          <Flex justifyContent="space-between" paddingY="2">
            <Box>
              <Text color="accent.3" fontSize="14">
                {assessment}
              </Text>
              <Progress size="xs" value={assessmentProgress} />
            </Box>
            <Text fontWeight="700" color="seondary.9" fontSize="18">
              {`${assessmentPercentage}%`}
            </Text>
          </Flex>
          <Flex justifyContent="space-between">
            <Box>
              <Text color="accent.3">{examination}</Text>
              <Progress
                colorScheme="red"
                size="xs"
                value={examinationProgress}
              />
            </Box>
            <Text fontWeight="700" color="seondary.9" fontSize="18">
              {`${examinationPercentage}%`}
            </Text>
          </Flex>
        </Box>

        <Box
          width="140px"
          height="140px"
          position="relative"
          display="flex"
          alignItems="center"
          justifyContent="center"
          data-percentage={`${totalPercentage}%`}
          _after={{
            content: "attr(data-percentage)",
            position: "absolute",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "100%",
            width: "100%",
            pointerEvents: "none",
            top: 0,
            left: 0,
          }}
        >
          <Doughnut width={3} height={3} {...totalCourseChartConfig} />
        </Box>
      </Flex>
    </Box>
  );
};

const CoursesOverviewPage = () => {
  const manager = useCoursesOverviewDetails();

  const { coursesOverview, isLoading } = manager;

  return (
    <Flex flexDirection="column" height="100%" width="100%">
      {isLoading ? (
        <PageLoaderLayout />
      ) : (
        <>
          <Box
            bgGradient="linear(to-l, #390411 31.84%, #540D1E 46.72%, #69192D 80.18%)"
            paddingY={10}
            paddingX={40}
          >
            <Heading fontSize="24" color="accent.1">
              {coursesOverview?.title}
            </Heading>
            <Text pt={3} color="accent.1" fontSize="lg">
              {coursesOverview?.completedCourses}
            </Text>

            <Flex justifyContent="space-between" mt={6}>
              {coursesOverview?.performanceOverview.map((performance) => {
                return (
                  <Box key={performance.id}>
                    <PerformanceOverviewCard
                      title={performance.title}
                      percentage={performance.totalProgress}
                      numberOfCourses={performance.numberOfCourses}
                      color={performance.color}
                      progress={performance.totalProgress}
                    />
                  </Box>
                );
              })}
            </Flex>
          </Box>
          <Box pt={10} paddingX={40}>
            <Text color="seondary.9" fontSize="24" fontWeight="500">
              {coursesOverview?.coursesProgress}
            </Text>
            {coursesOverview?.coursesInProgress.map((course) => {
              return (
                <Box key={course.id}>
                  <CourseOverviewCard
                    courseTitle={course.title}
                    duration={course.duration}
                    time={course.time}
                    attendance={course.attendance}
                    attendanceProgress={course.attendanceValue}
                    attendancePercentage={course.attendanceValue}
                    assessment={course.assessment}
                    assessmentPercentage={course.assessmentValue}
                    assessmentProgress={course.assessmentValue}
                    examination={course.examination}
                    examinationProgress={course.examinationValue}
                    examinationPercentage={course.examinationValue}
                    totalPercentage={course.totalProgress}
                  />
                </Box>
              );
            })}
          </Box>
          <Box paddingX={40}>
            <Text color="seondary.9" fontSize="24" fontWeight="500">
              {coursesOverview?.courseCompleted}
            </Text>
            {coursesOverview?.coursesCompleted.map((course) => {
              return (
                <Box key={course.id}>
                  <CourseOverviewCard
                    courseTitle={course.title}
                    duration={course.duration}
                    time={course.time}
                    attendance={course.attendance}
                    attendanceProgress={course.attendanceValue}
                    attendancePercentage={course.attendanceValue}
                    assessment={course.assessment}
                    assessmentPercentage={course.assessmentValue}
                    assessmentProgress={course.assessmentValue}
                    examination={course.examination}
                    examinationProgress={course.examinationValue}
                    examinationPercentage={course.examinationValue}
                    totalPercentage={course.totalProgress}
                  >
                    <Button
                      mt="4"
                      link={`/courses/${course.id}/certificate`}
                      size="sm"
                    >
                      View Certificate
                    </Button>
                  </CourseOverviewCard>
                </Box>
              );
            })}
          </Box>
        </>
      )}
    </Flex>
  );
};

export const CoursesOverviewPageRoute = ({ ...rest }) => {
  return (
    <Route {...rest} render={(props) => <CoursesOverviewPage {...props} />} />
  );
};
