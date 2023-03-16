import { Route, useLocation } from 'react-router-dom';
import { Box, Flex, HStack } from '@chakra-ui/layout';
import {
  CircularProgress,
  Center,
  ListItem,
  UnorderedList,
  Progress,
} from '@chakra-ui/react';
import { Doughnut } from 'react-chartjs-2';
import { Heading, Text, Button } from '../../../../components';
import colors from '../../../../theme/colors';
import useGradeDetails from './hooks/useGradeDetails';
import { PageLoaderLayout } from '../../../../layouts';
import { getDuration } from '../../../../utils';
import { ReactComponent as NoData } from '../../../../assets/images/no-data.svg';
import { useEffect } from 'react';

const totalCourseChartConfig = {
  data: {
    labels: ['Attendance', 'Examination', 'Attendance'],
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

const GradesPage = () => {
  const manager = useGradeDetails();

  const { grades, isLoading, myGrades } = manager;

  return (
    <>
      <Grades isLoading={isLoading} grades={grades} myGrades={myGrades} />
    </>
  );
};

export const Grades = ({ isLoading, grades, myGrades }) => {
  const isAdmin = /admin/i.test(window.location.pathname);
  console.log(myGrades);
  console.log('break');
  console.log(grades);

  const { hash } = useLocation();

  useEffect(() => {
    if (hash.includes('certificates')) {
      document.getElementById('certificates')?.scrollIntoView();
    }
  }, [hash]);

  return (
    <Flex flexDirection="column" height="100%" width="100%">
      {isLoading ? (
        <PageLoaderLayout />
      ) : (
        <>
          <Box
            bgGradient="linear(to-l, #390411 31.84%, #540D1E 46.72%, #69192D 80.18%)"
            paddingY={10}
            width="100%"
            paddingX={{ base: '40px', tablet: '80px', laptop: '160px' }}
          >
            <Heading fontSize="24" color="accent.1">
              Performance Overview
            </Heading>
            <Text pt={3} color="accent.1" fontSize="lg">
              {`${myGrades?.overview?.completedCourseLength} courses completed`}
            </Text>

            <HStack
              width="100%"
              flexDirection={{ base: 'column', laptop: 'row' }}
              gap={{ base: 4, lg: 2, md: 4 }}
              mt={6}
            >
              <PerformanceOverviewCard
                title="Attendance"
                percentage={myGrades?.overview?.averageAttendanceScore}
                completedCourses={myGrades?.overview?.completedCourseLength}
                totalCourses={myGrades?.overview?.totalCoursesCount}
                color="others.2"
                progress={myGrades?.overview?.averageAttendanceScore}
              />

              <PerformanceOverviewCard
                title="Assessment"
                percentage={myGrades?.overview?.averageAssessmentScore}
                completedCourses={myGrades?.overview?.completedCourseLength}
                totalCourses={myGrades?.overview?.totalCoursesCount}
                color="others.4"
                progress={myGrades?.overview?.averageAssessmentScore}
              />

              <PerformanceOverviewCard
                title="Examination"
                percentage={myGrades?.overview?.averageExaminationScore}
                completedCourses={myGrades?.overview?.completedCourseLength}
                totalCourses={myGrades?.overview?.totalCoursesCount}
                color="primary.base"
                progress={myGrades?.overview?.averageExaminationScore}
              />
            </HStack>
          </Box>
          <Box
            pt={10}
            paddingX={{ base: '40px', tablet: '80px', laptop: '160px' }}
            backgroundColor="white"
          >
            <Text color="seondary.9" fontSize="24" fontWeight="500">
              Courses in Progress
            </Text>
            {myGrades?.ongoingCourses?.[0] ? (
              myGrades?.ongoingCourses?.map((grade) => {
                const duration = getDuration(grade.courseDuration);
                return (
                  <Box key={grade.id}>
                    <CourseOverviewCard
                      courseTitle={grade.courseTitle}
                      courseTimeline={grade.courseTimeline}
                      time={`${duration.hours} hours, ${duration.minutes} minutes`}
                      attendance={grade.attendanceTitle}
                      attendanceProgress={grade.attendanceScore}
                      attendancePercentage={grade.attendanceScore}
                      assessment={grade.assessmentTitle}
                      assessmentPercentage={grade.assessmentScore}
                      assessmentProgress={grade.assessmentScore}
                      examination={grade.examinationTitle}
                      examinationProgress={grade.examinationScore}
                      examinationPercentage={grade.examinationScore}
                      totalPercentage={grade.totalScore}
                    />
                  </Box>
                );
              })
            ) : (
              <EmptyState
                text={
                  isAdmin
                    ? 'This user has not completed any course'
                    : 'You have not completed any course'
                }
              />
            )}
          </Box>
          <Box
            paddingX={{ base: '40px', tablet: '80px', laptop: '160px' }}
            backgroundColor="white"
            paddingBottom={isAdmin ? '40px' : null}
            id="certificates"
          >
            <Text color="seondary.9" fontSize="24" fontWeight="500">
              Courses Completed
            </Text>
            {myGrades?.completedCourses?.[0] ? (
              myGrades?.completedCourses.map((grade) => {
                const duration = getDuration(grade.courseDuration);
                return (
                  <Box key={grade.id}>
                    <CourseOverviewCard
                      courseTitle={grade.courseTitle}
                      courseTimeline={grade.courseTimeline}
                      time={`${duration.hours} hours, ${duration.minutes} minutes`}
                      attendance={grade.attendanceTitle}
                      attendanceProgress={grade.attendanceScore}
                      attendancePercentage={grade.attendanceScore}
                      assessment={grade.assessmentTitle}
                      assessmentPercentage={grade.assessmentScore}
                      assessmentProgress={grade.assessmentScore}
                      examination={grade.examinationTitle}
                      examinationProgress={grade.examinationScore}
                      examinationPercentage={grade.examinationScore}
                      totalPercentage={grade.totalScore}
                    >
                      <Button
                        mt="4"
                        link={`/courses/${grade.id}/certificate`}
                        size="sm"
                      >
                        View Certificate
                      </Button>
                    </CourseOverviewCard>
                  </Box>
                );
              })
            ) : (
              <EmptyState
                text={
                  isAdmin
                    ? 'This user has not completed any course'
                    : 'You have not completed any course'
                }
              />
            )}
          </Box>
        </>
      )}
    </Flex>
  );
};

export const EmptyState = ({ text }) => (
  <Flex
    justifyContent="center"
    alignItems="center"
    flexDirection="column"
    mt={4}
    border="1px"
    borderColor="secondary.1"
    boxShadow="base"
    w="100%"
    p={8}
    mb={6}
  >
    <NoData />
    <Text paddingTop={4} as="level1" color="secondary.5">
      {text}
    </Text>
  </Flex>
);

const PerformanceOverviewCard = ({
  title,
  percentage,
  completedCourses,
  totalCourses,
  progress,
  color,
}) => {
  return (
    <Box
      width="100%"
      borderRadius="12"
      bg="white"
      paddingX={{ base: '10px', laptop: '40px' }}
      paddingY={6}
    >
      <Flex flexDirection="row" justifyContent="space-between">
        <Box justifyContent="center" alignItems="center">
          <Text fontSize="20" fontWeight="700" color="accent.3">
            {title}
          </Text>
          <Text color="secondary.9" fontWeight="700" fontSize="36">
            {`${percentage}%`}
          </Text>
          <Text fontSize="14" color="accent.3">
            {`${completedCourses} out of ${totalCourses} courses`}
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
  courseTimeline,
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
      <Flex width="100%" flexDirection="row">
        <Box flex="1">
          <Text lineHeight="10" color="seondary.9" fontSize="20px">
            {courseTitle}
          </Text>
          <Flex color="accent.3" flexDirection="row">
            <Text fontSize="16px" pr="3">
              {`${courseTimeline} Weeks`}
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
            content: 'attr(data-percentage)',
            position: 'absolute',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100%',
            width: '100%',
            pointerEvents: 'none',
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

export const GradesPageRoute = ({ ...rest }) => {
  return <Route {...rest} render={(props) => <GradesPage {...props} />} />;
};
