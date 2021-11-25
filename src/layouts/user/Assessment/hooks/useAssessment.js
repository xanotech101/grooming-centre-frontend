import { useDisclosure } from "@chakra-ui/hooks";
import { useToast } from "@chakra-ui/toast";
import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router";
import { useCache } from "../../../../contexts";
import { Text } from "../../../../components";
import useQueryParams from "../../../../hooks/useQueryParams";
import useAssessmentPreview from "../../../../pages/user/Courses/TakeCourse/hooks/useAssessmentPreview";
import { submitAssessment } from "../../../../services";
import { submitExamination } from "../../../../services/http/endpoints/examination";
import { hasEnded, isUpcoming, sortByIndexField } from "../../../../utils";
import { CongratsModalContent } from "../Modal";
import useTimerCountdown from "./useTimerCountdown";
import { Box } from "@chakra-ui/layout";

const useAssessment = () => {
  const { assessment, isLoading, error, setError } = useAssessmentPreview();
  const { course_id } = useParams();
  const isExamination = useQueryParams().get("examination");

  assessment.questions = sortByIndexField(
    assessment.questions,
    "questionIndex"
  );
  assessment.questions?.forEach((question) => {
    question.options = sortByIndexField(question.options, "optionIndex");
  });

  const [currentQuestion, setCurrentQuestion] = useState({});

  const timerCountdownManger = useTimerCountdown({
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

  // Handle Late/Too Early comer :) and deals with completed assessment
  useEffect(() => {
    if (assessment.hasCompleted)
      setError(
        `You have already taken this ${
          isExamination ? "examination" : "assessment"
        }`
      );

    if (isUpcoming(assessment.startTime))
      setError(
        `This ${
          isExamination ? "examination" : "assessment"
        } is not yet time to be taken`
      );
    if (hasEnded(assessment.endTime))
      setError(
        `This ${isExamination ? "examination" : "assessment"} has already ended`
      );

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [assessment.endTime, assessment.startTime]);

  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [submitStatus, setSubmitStatus] = useState({
    success: false,
    error: false,
    loading: false,
  });

  const toast = useToast();
  // const {
  //   state: { user },
  // } = useApp();

  const handleSubmit = useCallback(async () => {
    setSubmitStatus({
      loading: true,
    });

    try {
      const questionIdArr = assessment?.questions?.reduce((acc, question) => {
        acc.push(question.id);
        return acc;
      }, []);
      const optionIdArr = [];

      questionIdArr.forEach((questionId, index) => {
        optionIdArr[index] = selectedAnswers[questionId] || null;
      });

      const context = isExamination ? "examination" : "assessment";

      const body = {
        [`${context}Id`]: assessment.id,
        [`${context}QuestionsId`]: questionIdArr,
        [`${context}OptionsId`]: optionIdArr,
        // userId: user.id,
        courseId: assessment.courseId,
      };

      //   {
      //     "assessmentId": "2a69af3f-3073-41b2-994d-bc31f69e37cb",
      //     "courseId": "c3b2a0a5-59eb-454f-9c2f-5a6b1c4ff1e2",
      // }

      console.log(questionIdArr, optionIdArr);

      await (isExamination ? submitExamination(body) : submitAssessment(body));

      setSubmitStatus({
        success: true,
      });
    } catch (error) {
      toast({
        description: error.message,
        position: "top",
        status: "error",
      });

      setSubmitStatus({
        error: error.message,
      });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    assessment.courseId,
    assessment.id,
    isExamination,
    selectedAnswers,
    // user?.id,
  ]);

  // Automatically submit when timeout
  useEffect(() => {
    if (timerCountdownManger.hasEnded.timeout) {
      handleSubmit();
    }
  }, [timerCountdownManger.hasEnded.timeout, handleSubmit]);

  const modalManager = useDisclosure();
  const [modalContent, setModalContent] = useState();
  const [modalPrompt, setModalPrompt] = useState(null);
  const [modalCanClose, setModalCanClose] = useState(true);

  const { handleDelete } = useCache();

  const handleAfterSubmit = () => {
    modalManager.onOpen();
    setModalCanClose(false);
    setModalPrompt(null);
    handleDelete(course_id);
    setModalContent(
      <CongratsModalContent
        redirectLink={`/courses/details/${course_id}`}
        contextText={assessment.topic}
      />
    );
    timerCountdownManger.handleStopCountdown();
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
      heading: `Are you sure you want to submit your ${
        isExamination ? "examination" : "assessment"
      }?`,
      body: (
        <>
          <Text marginBottom={5}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. A,
            tristique aliquam adipiscing senectus nulla nibh.."
          </Text>

          <Text marginBottom={5}>
            Answered{" "}
            <Box as="b" color="secondary.6" fontSize="text.level3">
              {Reflect.ownKeys(selectedAnswers).length}
            </Box>{" "}
            of{" "}
            <Box as="b" fontSize="text.level3">
              {assessment.questionCount}
            </Box>
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
    timerCountdownManger,
    modalManager: {
      ...modalManager,
      content: modalContent,
      prompt: modalPrompt,
      canClose: modalCanClose,
    },
  };
};

export default useAssessment;
