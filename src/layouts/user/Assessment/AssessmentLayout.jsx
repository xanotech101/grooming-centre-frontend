import { Box, Flex, Grid, HStack, Stack } from "@chakra-ui/layout";
import { Radio, RadioGroup } from "@chakra-ui/radio";
import { useEffect, useRef, useState } from "react";
import { Route, useParams, Redirect } from "react-router-dom";
import { Button, Heading, Text } from "../../../components";
import useQueryParams from "../../../hooks/useQueryParams";
import useAssessmentPreview from "../../../pages/user/Courses/TakeCourse/hooks/useAssessmentPreview";
import breakpoints from "../../../theme/breakpoints";
import { PageLoaderLayout } from "../../global/PageLoader/PageLoaderLayout";

/**
 * sorts by the index field
 * @param {*} arrayKey
 * @param {*} field
 * @returns {Array}
 */
const sortByIndexField = (array, field) =>
  array
    ? [...array].sort((a, b) => {
        if (a[field] > b[field]) return 1;
        if (a[field] <= b[field]) return -1;
        return -1;
      })
    : [];

const useTimer = ({
  startDate: _startDate,
  endDate: _endDate,
  // duration
}) => {
  const [startDate, setStartDate] = useState();
  const endDate = new Date(_endDate);
  // const endDate = new Date(startDate.getTime() + duration * 60000); //TODO: remove
  const [startCountDown, setStartCountDown] = useState(false);
  const [hasTimeout, setHasTimeout] = useState(false);

  const nowTime = new Date().getTime();
  const endTime = endDate?.getTime();
  const [hasEnded, setHasEnded] = useState({ elapsed: false, timeout: false });

  useEffect(() => {
    console.log("effect 1");
    if (endTime && nowTime) {
      if (nowTime > endTime) {
        setHasEnded({ elapsed: true });
      }
    }

    if (hasTimeout) {
      setHasEnded({ timeout: true });
    }
  }, [nowTime, endTime, hasTimeout]);

  // Initialize startDate
  useEffect(() => {
    console.log("effect 2");
    if (_startDate) setStartDate(new Date(_startDate));
  }, [_startDate]);

  // Trigger countdown
  useEffect(() => {
    console.log("effect 3");

    if (startDate && !hasEnded.elapsed && !hasEnded.timeout) {
      setStartCountDown(true);
    } else {
      setStartCountDown(false);
    }
  }, [hasEnded.elapsed, hasEnded.timeout, startDate]);
  // eslint-disable-next-line react-hooks/exhaustive-deps

  const [timeLeft, setTimeLeft] = useState({});

  const timeDistance = (date1, date2) => {
    let distance = Math.abs(date1 - date2);
    const hours = Math.floor(distance / 3600000);
    distance -= hours * 3600000;
    const minutes = Math.floor(distance / 60000);
    distance -= minutes * 60000;
    const seconds = Math.floor(distance / 1000);

    return {
      hours: hours || "00",
      minutes: /an/i.test(("0" + minutes).slice(-2))
        ? "00"
        : ("0" + minutes).slice(-2),
      seconds: /an/i.test(("0" + seconds).slice(-2))
        ? "00"
        : ("0" + seconds).slice(-2),
    };
  };

  const timeLeftHMS = timeDistance(startDate, endDate);

  useEffect(() => {
    console.log("effect 4");
    console.log(timeLeftHMS);
    setTimeLeft(timeLeftHMS);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timeLeftHMS.hours, timeLeftHMS.minutes, timeLeftHMS.seconds]);

  const intervalIdRef = useRef();
  const handleStopCountdown = (id) => clearInterval(id);

  // Implement countdown
  useEffect(() => {
    console.log("effect 5");
    if (startCountDown) {
      intervalIdRef.current = setInterval(() => {
        console.log("count down");

        setStartDate((prev) => {
          if (
            +timeLeftHMS.hours === 0 &&
            +timeLeftHMS.minutes === 0 &&
            +timeLeftHMS.seconds - 1 === 0
          ) {
            setHasTimeout(true);
          }

          return new Date(prev.getTime() + 1000);
        });
      }, 1000);

      return () => handleStopCountdown(intervalIdRef.current);
    } else {
      handleStopCountdown(intervalIdRef.current);
    }
  }, [
    startCountDown,
    timeLeftHMS.hours,
    timeLeftHMS.minutes,
    timeLeftHMS.seconds,
  ]);
  // eslint-disable-next-line react-hooks/exhaustive-deps

  return {
    timeLeft,
    hasEnded,
  };
};

const useAssessment = () => {
  const { assessment, isLoading, error } = useAssessmentPreview();
  const { course_id } = useParams();

  assessment.questions = sortByIndexField(
    assessment.questions,
    "questionIndex"
  );
  assessment.questions?.forEach((question) => {
    question.options = sortByIndexField(question.options, "optionIndex");
  });

  const [currentQuestion, setCurrentQuestion] = useState({});

  const timerManger = useTimer({
    startDate: assessment.startTime,
    endDate: assessment.endTime,
  });

  useEffect(() => {
    // console.log("effect 7");
    if (assessment) {
      setCurrentQuestion(assessment.questions?.[0]);
    } // TODO: sort questions by `questionIndex`

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [assessment.questions?.[0]]);

  const handleQuestionChange = (question) => {
    console.log(question);

    setCurrentQuestion(question);
  };

  return {
    assessment,
    course_id,
    isLoading,
    error,
    timeLeft: timerManger.timeLeft,
    hasEnded: timerManger.hasEnded,
    currentQuestion,
    handleQuestionChange,
  };
};

// let submitReqBody = {
//   // TODO:remove
//   assessmentId: [
//     { assessmentQuestionId: "", selectedAssessmentOptionId: "" }, // TODO:remove
//     { assessmentQuestionId: "", selectedAssessmentOptionId: "" }, // TODO:remove
//   ],
// }; // TODO:remove

const AssessmentLayout = () => {
  const {
    assessment,
    course_id,
    currentQuestion,
    error,
    isLoading,
    timeLeft,
    hasEnded,
    handleQuestionChange,
  } = useAssessment();

  const renderSubHeading = (heading) => (
    <Box
      as="header"
      paddingBottom={5}
      marginBottom={5}
      borderBottom="1px"
      borderColor="accent.2"
    >
      <Heading fontSize="text.level2">{heading}</Heading>
    </Box>
  );

  const renderContent = () =>
    isLoading ? (
      <PageLoaderLayout />
    ) : error ? (
      <PageLoaderLayout>
        <Heading as="h1" fontSize="heading.h3">
          {error}
        </Heading>

        <Button link={`/`} marginTop={10}>
          Try again
        </Button>
      </PageLoaderLayout>
    ) : (
      <Flex
        justifyContent="center"
        alignItems="flex-start"
        backgroundColor="accent.1"
        height="100vh"
        width="100vw"
      >
        <Box
          width="100%"
          maxWidth={breakpoints.laptop}
          backgroundColor="white"
          marginTop={20}
          shadow="0px 2px 7px rgba(0, 0, 0, 0.1)"
        >
          <Box
            as="header"
            color="white"
            backgroundColor="primary.base"
            padding={5}
            paddingX={10}
          >
            <Heading as="h1" fontSize="heading.h4">
              {assessment.topic}
            </Heading>
          </Box>

          <Flex paddingX={10} paddingY={5} height="100%">
            <Flex
              flexDirection="column"
              as="main"
              flex={1}
              borderRight="1px"
              borderColor="accent.2"
              paddingRight={5}
              marginRight={5}
            >
              {renderSubHeading(
                `Question ${currentQuestion?.questionIndex + 1} of ${
                  assessment.questionCount
                }`
              )}
              <Flex
                flexDirection="column"
                justifyContent="space-between"
                as="form"
                flex={1}
                // minHeight="500px"
              >
                <Text marginBottom={6} flex={0.2}>
                  {currentQuestion?.question}
                </Text>

                <RadioGroup defaultValue="1" marginBottom={8} flex={1}>
                  <Stack spacing={4}>
                    {currentQuestion?.options?.map((option) => (
                      <Radio key={option.id} value={option.id}>
                        <Text>{option.name}</Text>
                      </Radio>
                    ))}
                  </Stack>
                </RadioGroup>

                <Flex justifyContent="space-between">
                  <Button secondary>Previous</Button>
                  <Button type="submit">Next</Button>
                </Flex>
              </Flex>
            </Flex>

            <Box as="aside" flex="0 0 232px">
              {renderSubHeading("Time Left")}

              <Flex justifyContent="space-between" marginBottom={6}>
                <Box textAlign="center">
                  <Text bold as="level1">
                    {timeLeft.hours || "00"}
                  </Text>
                  <Text color="accent.2">hours</Text>
                </Box>

                <Box textAlign="center">
                  <Text bold as="level1">
                    {timeLeft.minutes}
                  </Text>
                  <Text color="accent.2">minutes</Text>
                </Box>

                <Box textAlign="center">
                  <Text bold as="level1">
                    {timeLeft.seconds}
                  </Text>
                  <Text color="accent.2">seconds</Text>
                </Box>
              </Flex>

              <Box>
                <Heading as="h3" fontSize="text.level3" marginBottom={2}>
                  Questions
                </Heading>

                <Flex justifyContent="space-between" marginY={5}>
                  <HStack spacing={2}>
                    <Box
                      width="20px"
                      height="6px"
                      backgroundColor="primary.base"
                      border="1px"
                      borderColor="transparent"
                    ></Box>
                    <Text as="level5" bold>
                      Answered
                    </Text>
                  </HStack>

                  <HStack spacing={2}>
                    <Box
                      width="20px"
                      height="6px"
                      border="1px"
                      borderColor="primary.base"
                    ></Box>
                    <Text as="level5" bold>
                      Unanswered
                    </Text>
                  </HStack>
                </Flex>

                <Grid templateColumns="repeat(5, 1fr)" gap={2}>
                  {assessment?.questions?.map((question, index) => (
                    <ButtonNavItem
                      key={index}
                      number={index + 1}
                      isCurrent={
                        currentQuestion?.questionIndex ===
                        question.questionIndex
                      }
                      onClick={handleQuestionChange.bind(null, question)}
                    />
                  ))}
                </Grid>
              </Box>
            </Box>
          </Flex>
        </Box>
      </Flex>
    );

  return hasEnded.elapsed || hasEnded.timeout ? (
    <Redirect
      to={`/courses/take/${course_id}/assessment/end/${assessment.id}?${
        hasEnded.timeout ? `timeout=true&` : ""
      }${hasEnded.elapsed ? `elapsed=true` : ""}`}
    />
  ) : (
    renderContent()
  );
};

const ButtonNavItem = ({ number, answered, isCurrent, onClick }) => {
  const styleProps = answered
    ? {
        backgroundColor: "primary.base",
        color: "white",
        borderColor: "transparent",
      }
    : {
        borderColor: "primary.base",
      };

  return (
    <Flex
      justifyContent="center"
      boxSize="40px"
      rounded="4px"
      alignItems="center"
      border="1px"
      as="button"
      cursor="pointer"
      onClick={onClick}
      transition=".5s"
      transform={isCurrent && "scale(1.1)"}
      {...styleProps}
    >
      <Text bold as="level1">
        {number}
      </Text>
    </Flex>
  );
};

export const AssessmentLayoutRoute = ({ ...rest }) => {
  return (
    <Route {...rest} render={(props) => <AssessmentLayout {...props} />} />
  );
};

const AssessmentHasEnded = () => {
  const queryParam = useQueryParams();
  const { course_id } = useParams();

  const message = queryParam.get("elapsed")
    ? "This assessment has already ended"
    : queryParam.get("timeout")
    ? "Timeout! you answers has been submitted"
    : "";

  return (
    <PageLoaderLayout>
      <Heading as="h1" fontSize="heading.h3">
        {message}
      </Heading>

      <Button link={`/courses/details/${course_id}`} marginTop={10}>
        Back to course
      </Button>
    </PageLoaderLayout>
  );
};

export const AssessmentHasEndedRoute = ({ ...rest }) => {
  return (
    <Route {...rest} render={(props) => <AssessmentHasEnded {...props} />} />
  );
};
