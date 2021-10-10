import { useDisclosure } from "@chakra-ui/hooks";
import Icon from "@chakra-ui/icon";
import { Box, Flex, Grid, HStack, Stack } from "@chakra-ui/layout";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/modal";
import { Radio, RadioGroup } from "@chakra-ui/radio";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { AiOutlineLeft } from "react-icons/ai";
import { HiBadgeCheck } from "react-icons/hi";
import { Route, useParams } from "react-router-dom";
import { Button, Heading, Text } from "../../../components";
import useAssessmentPreview from "../../../pages/user/Courses/TakeCourse/hooks/useAssessmentPreview";
import { submitAssessment } from "../../../services";
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
  const endDate = useMemo(() => new Date(_endDate), [_endDate]);
  // const endDate = new Date(startDate.getTime() + duration * 60000); //TODO: remove
  const [startCountDown, setStartCountDown] = useState(false);
  const [hasTimeout, setHasTimeout] = useState(false);

  const nowTime = useMemo(() => new Date().getTime(), []);
  const endTime = useMemo(
    () => endDate?.getTime(),

    [endDate]
  );
  const startTime = useMemo(
    () => startDate?.getTime(),

    [startDate]
  );
  const [hasEnded, setHasEnded] = useState({
    elapsed: false,
    timeout: false,
    notYetTime: false,
  });

  useEffect(() => {
    if (nowTime) {
      if (endTime && nowTime > endTime) {
        setHasEnded({ elapsed: true });
      }
      if (endTime && startTime > nowTime) {
        setHasEnded({ notYetTime: true });
      }
    }

    if (hasTimeout) {
      setHasEnded({ timeout: true });
    }
  }, [endTime, nowTime, hasTimeout, startTime]);

  // Initialize startDate
  useEffect(() => {
    if (_startDate) setStartDate(new Date(_startDate));
  }, [_startDate]);

  // Trigger countdown
  useEffect(() => {
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
    setTimeLeft(timeLeftHMS);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timeLeftHMS.hours, timeLeftHMS.minutes, timeLeftHMS.seconds]);

  const intervalIdRef = useRef();
  const handleStopCountdown = () => clearInterval(intervalIdRef.current);

  // Implement countdown
  useEffect(() => {
    if (startCountDown) {
      intervalIdRef.current = setInterval(() => {
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

      return () => handleStopCountdown();
    } else {
      handleStopCountdown();
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
    handleStopCountdown,
  };
};

const useAssessment = () => {
  const { assessment, isLoading, error, setError } = useAssessmentPreview();
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

  // Initialize the first question
  useEffect(() => {
    if (assessment) {
      setCurrentQuestion(assessment.questions?.[0]);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [assessment.questions?.[0]]);

  // Handle Late/TooEarly comer :)
  useEffect(() => {
    if (timerManger.hasEnded.notYetTime)
      setError("This assessment is not yet time to be taken");
    if (timerManger.hasEnded.elapsed)
      setError("This assessment has already ended");

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timerManger.hasEnded.elapsed]);

  // Handle taken assessment :)
  // useEffect(() => { //TODO: uncomment
  //   if (assessment.hasBeenTaken)//TODO: uncomment
  //     setError("You have already taken this assessment");//TODO: uncomment

  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [assessment.hasBeenTaken]);//TODO: uncomment

  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [submitStatus, setSubmitStatus] = useState({
    success: false,
    error: false,
    loading: false,
  });

  const handleSubmit = useCallback(async () => {
    setSubmitStatus({
      loading: true,
    });

    try {
      // const newAnswers =  { // TODO:remove
      //   assessmentId: [
      //     { assessmentQuestionId: "", selectedAssessmentOptionId: "" }, // TODO:remove
      //     { assessmentQuestionId: "", selectedAssessmentOptionId: "" }, // TODO:remove
      //   ],
      // }; // TODO:remove

      await submitAssessment(assessment.id, selectedAnswers);

      setSubmitStatus({
        success: true,
      });
    } catch (error) {
      setSubmitStatus({
        error: error.message,
      });
    }
  }, [selectedAnswers, assessment.id]);

  // Automatically submit when timeout
  useEffect(() => {
    if (timerManger.hasEnded.timeout) {
      handleSubmit();
    }
  }, [timerManger.hasEnded.timeout, handleSubmit]);

  const modalManager = useDisclosure();
  const [modalContent, setModalContent] = useState();
  const [modalPrompt, setModalPrompt] = useState(null);
  const [modalCanClose, setModalCanClose] = useState(true);

  const handleAfterSubmit = () => {
    modalManager.onOpen();
    setModalCanClose(false);
    setModalPrompt(null);
    setModalContent(
      <CongratsModalContent
        redirectLink={`/courses/details/${course_id}`}
        contextText={assessment.topic}
      />
    );
    timerManger.handleStopCountdown();
  };

  // Setup UI after success submission
  useEffect(() => {
    if (submitStatus.success) {
      handleAfterSubmit();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [submitStatus.success]);

  // Prompt to continue/cancel submission
  const handleSubmitConfirmation = (e) => {
    e.preventDefault();

    modalManager.onOpen();
    setModalContent(null);
    setModalPrompt({
      heading: "Are you sure you want to submit your assessment?",
      body: (
        <>
          <Text marginBottom={5}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. A,
            tristique aliquam adipiscing senectus nulla nibh.."
          </Text>

          <Text marginBottom={5}>
            Answered <b>{Reflect.ownKeys(selectedAnswers).length}</b> of{" "}
            <b>{assessment.questionCount}</b>
          </Text>
        </>
      ),
      submitProps: {
        onClick: handleSubmit,
      },
    });
  };

  const handleQuestionChange = (question) => setCurrentQuestion(question);

  const handleNextQuestion = (e) => {
    e.preventDefault();

    const nextQuestion =
      assessment.questions[currentQuestion?.questionIndex + 1];

    handleQuestionChange(nextQuestion);
  };

  const handlePreviousQuestion = () => {
    const previousQuestion =
      assessment.questions[currentQuestion?.questionIndex - 1];

    handleQuestionChange(previousQuestion);
  };

  const handleOptionSelect = (selectedAssessmentOptionId) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [currentQuestion?.id]: selectedAssessmentOptionId,
    }));
  };

  const shouldSubmit =
    assessment.questionCount - 1 === currentQuestion?.questionIndex
      ? true
      : false;

  const disablePreviousQuestion = !currentQuestion?.questionIndex;

  return {
    assessment,
    course_id,
    isLoading,
    error,
    submitStatus,
    currentQuestion,
    shouldSubmit,
    disablePreviousQuestion,
    selectedAnswers,
    handleSubmitConfirmation,
    handleQuestionChange,
    handleNextQuestion,
    handlePreviousQuestion,
    handleOptionSelect,
    timerManger,
    modalManager: {
      ...modalManager,
      content: modalContent,
      prompt: modalPrompt,
      canClose: modalCanClose,
    },
  };
};

const AssessmentLayout = () => {
  const {
    assessment,
    course_id,
    currentQuestion,
    disablePreviousQuestion,
    error,
    isLoading,
    modalManager,
    shouldSubmit,
    selectedAnswers,
    timerManger,
    handleSubmitConfirmation,
    handleQuestionChange,
    handleNextQuestion,
    handlePreviousQuestion,
    handleOptionSelect,
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

        <Button link={`/courses/details/${course_id}`} marginTop={10}>
          Back to course
        </Button>
      </PageLoaderLayout>
    ) : (
      <>
        <CustomModal
          onClose={modalManager.onClose}
          canClose={modalManager.canClose}
          isOpen={modalManager.isOpen}
          prompt={modalManager.prompt}
        >
          {modalManager.content}
        </CustomModal>

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
                  onSubmit={
                    shouldSubmit ? handleSubmitConfirmation : handleNextQuestion
                  }
                >
                  <Text marginBottom={6} flex={0.2}>
                    {currentQuestion?.question}
                  </Text>

                  <RadioGroup
                    defaultValue="1"
                    marginBottom={8}
                    flex={1}
                    onChange={handleOptionSelect}
                    value={selectedAnswers[currentQuestion?.id]}
                  >
                    <Stack spacing={4}>
                      {currentQuestion?.options?.map((option) => (
                        <Radio key={option.id} value={option.id}>
                          <Text>{option.name}</Text>
                        </Radio>
                      ))}
                    </Stack>
                  </RadioGroup>

                  <Flex justifyContent="space-between">
                    <Button
                      secondary
                      onClick={handlePreviousQuestion}
                      disabled={disablePreviousQuestion}
                    >
                      Previous
                    </Button>

                    <Button type="submit">
                      {shouldSubmit ? "Submit" : "Next"}
                    </Button>
                  </Flex>
                </Flex>
              </Flex>

              <Box as="aside" flex="0 0 232px">
                {renderSubHeading("Time Left")}

                <Flex justifyContent="space-between" marginBottom={6}>
                  <Box textAlign="center">
                    <Text bold as="level1">
                      {timerManger.timeLeft.hours || "00"}
                    </Text>
                    <Text color="accent.2">hours</Text>
                  </Box>

                  <Box textAlign="center">
                    <Text bold as="level1">
                      {timerManger.timeLeft.minutes}
                    </Text>
                    <Text color="accent.2">minutes</Text>
                  </Box>

                  <Box textAlign="center">
                    <Text bold as="level1">
                      {timerManger.timeLeft.seconds}
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
                        answered={selectedAnswers[question?.id]}
                        onClick={handleQuestionChange.bind(null, question)}
                      />
                    ))}
                  </Grid>
                </Box>
              </Box>
            </Flex>
          </Box>
        </Flex>
      </>
    );

  return renderContent();
};

const CustomModal = ({
  isOpen,
  onClose,
  canClose = false,
  prompt,
  children,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={canClose ? onClose : () => {}}>
      <ModalOverlay />
      <ModalContent>
        {prompt && (
          <>
            <ModalHeader>{prompt.heading}</ModalHeader>

            <ModalBody>{prompt.body}</ModalBody>

            <ModalFooter>
              <Button secondary mr={3} onClick={onClose}>
                Close
              </Button>
              {prompt.submitProps && (
                <Button {...prompt.submitProps}>
                  {prompt.submitText || "Submit"}
                </Button>
              )}
            </ModalFooter>
          </>
        )}

        {children}
      </ModalContent>
    </Modal>
  );
};

const CongratsModalContent = ({ redirectLink, contextText }) => (
  <Grid placeItems="center" minHeight="300px">
    <Heading as="h3">Congratulations</Heading>

    <Icon boxSize={"100px"} fontSize="heading.h3" color="primary.base">
      <HiBadgeCheck />
    </Icon>

    <Flex>
      <Text as="level2" marginRight={2}>
        {contextText}
      </Text>

      <Text color="accent.3" as="level2">
        is completed
      </Text>
    </Flex>

    {/* <Box width="100%" textAlign="right"> */}
    <Button sm link={redirectLink} ghost leftIcon={<AiOutlineLeft />}>
      Back to course
    </Button>
    {/* </Box> */}
  </Grid>
);

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

// const AssessmentHasEnded = () => {
//   const queryParam = useQueryParams();
//   const { course_id } = useParams();

//   const message = queryParam.get("elapsed")
//     ? "This assessment has already ended"
//     : queryParam.get("timeout")
//     ? "Timeout! you answers has been submitted"
//     : "";

//   return (
//     <PageLoaderLayout>
//       <Heading as="h1" fontSize="heading.h3">
//         {message}
//       </Heading>

//       <Button link={`/courses/details/${course_id}`} marginTop={10}>
//         Back to course
//       </Button>
//     </PageLoaderLayout>
//   );
// };

// export const AssessmentHasEndedRoute = ({ ...rest }) => {
//   return (
//     <Route {...rest} render={(props) => <AssessmentHasEnded {...props} />} />
//   );
// };
