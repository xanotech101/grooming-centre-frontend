import { useDisclosure } from "@chakra-ui/hooks";
import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router";
import { Text } from "../../../../components";
import useQueryParams from "../../../../hooks/useQueryParams";
import useAssessmentPreview from "../../../../pages/user/Courses/TakeCourse/hooks/useAssessmentPreview";
import { submitAssessment } from "../../../../services";
import { submitExamination } from "../../../../services/http/endpoints/examination";
import { sortByIndexField } from "../../../../utils";
import { CongratsModalContent } from "../Modal";
import useTimerCountdown from "./useTimerCountdown";

const useAssessment = () => {
  const { assessment, isLoading, error, setError } = useAssessmentPreview();
  const { course_id } = useParams();

  assessment.questions = sortByIndexField(
    // TODO: propose this field to be implemented by the BACKEND team
    assessment.questions, // TODO: propose this field to be implemented by the BACKEND team
    "questionIndex" // TODO: propose this field to be implemented by the BACKEND team
  ); // TODO: propose this field to be implemented by the BACKEND team

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

  // Handle Late/TooEarly comer :)
  useEffect(() => {
    if (timerCountdownManger.hasEnded.notYetTime)
      setError("This assessment is not yet time to be taken");
    if (timerCountdownManger.hasEnded.elapsed)
      setError("This assessment has already ended");

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timerCountdownManger.hasEnded.elapsed]);

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

  const isExamination = useQueryParams().get("examination");

  const handleSubmit = useCallback(async () => {
    setSubmitStatus({
      loading: true,
    });

    try {
      const answers = {};

      answers[assessment.id] = Reflect.ownKeys(selectedAnswers).reduce(
        (accumulator, assessmentQuestionId) => {
          const selectedAssessmentOptionId =
            selectedAnswers[assessmentQuestionId];

          const answer = { assessmentQuestionId, selectedAssessmentOptionId };

          accumulator.push(answer);

          return accumulator;
        },
        []
      );

      await (isExamination
        ? submitExamination(assessment.id, answers)
        : submitAssessment(assessment.id, answers));

      setSubmitStatus({
        success: true,
      });
    } catch (error) {
      setSubmitStatus({
        error: error.message,
      });
    }
  }, [assessment.id, selectedAnswers, isExamination]);

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
