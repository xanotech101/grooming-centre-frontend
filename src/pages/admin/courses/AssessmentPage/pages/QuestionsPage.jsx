import { useToast } from "@chakra-ui/toast";
import { Flex, Box } from "@chakra-ui/layout";
import { Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/menu";
import { Route } from "react-router-dom";
import {
  RichText,
  Input,
  Heading,
  Text,
  Button,
  Link,
} from "../../../../../components";
import { useForm } from "react-hook-form";
import { Radio, RadioGroup, Stack } from "@chakra-ui/react";
import { useHistory, useParams } from "react-router";
import { useRichText, useQueryParams, useFetch } from "../../../../../hooks";
import { capitalizeFirstLetter, capitalizeWords } from "../../../../../utils";
import { FiMoreHorizontal } from "react-icons/fi";
import {
  adminCreateAssessmentQuestion,
  adminCreateExaminationQuestion,
  adminEditAssessmentQuestion,
  adminEditExaminationQuestion,
  adminGetQuestionDetails,
} from "../../../../../services";
import useAssessmentPreview from "../../../../../pages/user/Courses/TakeCourse/hooks/useAssessmentPreview";
import { PageLoaderLayout } from "../../../../../layouts";
import { useCallback, useEffect, useState } from "react";

const questionListingLink = (courseId, assessmentId, isExamination) =>
  `/admin/courses/${courseId}/assessment/${assessmentId}/questions/list?question-listing=true${
    isExamination ? "&examination=true" : ""
  }`;

const QuestionsPage = () => {
  const isQuestionListingPage = useQueryParams().get("question-listing");
  const { id: courseId, assessmentId } = useParams();
  const isExamination = /examination/i.test(window.location.search);

  // // Remove Scrollbar on the body
  // useEffect(() => {
  //   const body = document.querySelector("body");
  //   body.style.overflow = "hidden";

  //   return () => {
  //     body.style.overflow = "auto";
  //   };
  // }, []);

  return (
    <>
      <Heading fontSize="heading.h3" paddingTop={3} paddingX={6}>
        {isExamination ? "Examination" : "Assessment"}
      </Heading>

      <Flex>
        {isQuestionListingPage ? (
          <QuestionListingPage />
        ) : (
          <CreateQuestionPage />
        )}

        <Box padding={6} width="30%">
          <Box
            paddingTop="20px"
            paddingX="20px"
            paddingBottom="60px"
            backgroundColor="white"
            height={240}
          >
            <Heading fontSize="heading.h5">
              <Link
                href={questionListingLink(
                  courseId,
                  assessmentId,
                  isExamination
                )}
              >
                Questions Overview
              </Link>
            </Heading>
          </Box>
        </Box>
      </Flex>
    </>
  );
};

const useQuestionDetails = () => {
  const { resource: question, handleFetchResource } = useFetch();
  const { questionId } = useParams();
  const isEditMode = questionId && questionId !== "new";

  const fetcher = useCallback(async () => {
    if (isEditMode) {
      const { question } = await adminGetQuestionDetails(questionId);

      console.log(question);

      return question;
    }
  }, [isEditMode, questionId]);

  // Handle fetch category
  useEffect(() => {
    handleFetchResource({ fetcher });
  }, [handleFetchResource, fetcher]);

  return {
    question: question.data,
  };
};

const CreateQuestionPage = () => {
  const { push } = useHistory();
  const toast = useToast();
  const { id: courseId, assessmentId, questionId } = useParams();
  const isExamination = /examination/i.test(window.location.search);

  // const {
  //   assessment,
  //   // isLoading, error
  // } = useAssessmentPreview(null, assessmentId);

  const isEditMode = questionId && questionId !== "new";

  const { question } = useQuestionDetails();

  const { register, reset, handleSubmit, setValue } = useForm();
  const [answer, setAnswer] = useState();
  const questionRichTextManager = useRichText();

  useEffect(() => {
    if (question) {
      questionRichTextManager.handleInitData(question.question);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [question]);

  useEffect(() => {
    if (question) {
      const option1 = question.options.find((opt) => opt.optionIndex === 1);

      setValue("option-1", option1.name);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [question]);
  useEffect(() => {
    if (question) {
      const option2 = question.options.find((opt) => opt.optionIndex === 2);

      setValue("option-2", option2.name);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [question]);
  useEffect(() => {
    if (question) {
      const option3 = question.options.find((opt) => opt.optionIndex === 3);

      setValue("option-3", option3.name);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [question]);
  useEffect(() => {
    if (question) {
      const option4 = question.options.find((opt) => opt.optionIndex === 4);

      setValue("option-4", option4.name);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [question]);
  useEffect(() => {
    if (question) {
      const optionWithAns = question.options.find((opt) => opt.isAnswer);
      setAnswer(`${optionWithAns?.optionIndex}`);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [question]);

  const onSubmit = async (data) => {
    try {
      const questionText =
        questionRichTextManager.handleGetValueAndValidate("Question");
      const options = buildOptions({ ...data, answer });

      // Validate `isAnswer` field
      const hasAnswer = options.find((opt) => opt.isAnswer);
      if (!hasAnswer) throw new Error("Please select an answer");

      data = isExamination
        ? {
            examinationId: assessmentId,
            question: questionText,
            options,
          }
        : { assessmentId, question: questionText, options };

      console.log(data);

      const body = data;

      const { message } = await (isEditMode && !isExamination
        ? adminEditAssessmentQuestion({
            question: {
              id: questionId,
              question: questionText,
              assessmentId,
            },
            options: options.map((opt) => ({
              ...opt,
              id: question?.options.find(({ name }) => opt.name === name)?.id,
              assessmentQuestionId: questionId,
            })),
          })
        : isEditMode && isExamination
        ? adminEditExaminationQuestion({
            question: {
              id: questionId,
              question: questionText,
              examinationId: assessmentId,
            },
            options: options.map((opt) => ({
              ...opt,
              id: question?.options.find(({ name }) => opt.name === name)?.id,
              examinationQuestionId: questionId,
            })),
          })
        : isExamination
        ? adminCreateExaminationQuestion(body)
        : adminCreateAssessmentQuestion(body));
      reset();

      toast({
        description: capitalizeFirstLetter(message),
        position: "top",
        status: "success",
      });
      push(questionListingLink(courseId, assessmentId, isExamination));
    } catch (error) {
      toast({
        description: capitalizeFirstLetter(error.message),
        position: "top",
        status: "error",
      });
    }
  };

  return (
    <Box as="form" onSubmit={handleSubmit(onSubmit)} padding={6} width="70%">
      <Box
        paddingTop="20px"
        paddingX="20px"
        paddingBottom="60px"
        backgroundColor="white"
      >
        <RichText
          height="250px"
          id="question"
          label="Question 01"
          placeholder="Enter your question here"
          onChange={questionRichTextManager.handleChange}
          defaultValue={questionRichTextManager.data.default}
        />
      </Box>
      <Box marginTop={10} padding={6} backgroundColor="white">
        <Heading fontSize="heading.h4">Enter the Options</Heading>
        <Text paddingTop={2} paddingBottom={8}>
          Mark the correct option
        </Text>
        <RadioGroup onChange={setAnswer} value={answer}>
          <Stack direction="column">
            <Flex flexDirection="row" paddingBottom={6}>
              <Radio
                paddingTop={8}
                paddingRight={6}
                value="1"
                id="radio-1"
                // {...register("answer")}
              />
              <Input
                id="option-1"
                label="Option 01"
                {...register("option-1", { required: "must not be empty" })}
                placeholder="Enter the first option here"
              />
            </Flex>

            <Flex flexDirection="row" paddingBottom={6}>
              <Radio
                paddingTop={8}
                paddingRight={6}
                value="2"
                id="radio-2"
                // {...register("answer")}
              />
              <Input
                id="option-2"
                label="Option 02"
                {...register("option-2", { required: "must not be empty" })}
                placeholder="Enter the first option here"
              />
            </Flex>

            <Flex flexDirection="row" paddingBottom={6}>
              <Radio
                paddingTop={8}
                paddingRight={6}
                value="3"
                id="radio-3"
                // {...register("answer")}
              />
              <Input
                id="option-3"
                label="Option 03"
                {...register("option-3", { required: "must not be empty" })}
                placeholder="Enter the first option here"
              />
            </Flex>
            <Flex flexDirection="row" paddingBottom={6}>
              <Radio
                paddingTop={8}
                paddingRight={6}
                value="4"
                id="radio-4"
                // {...register("answer")}
              />
              <Input
                id="option-4"
                label="Option 04"
                {...register("option-4", { required: "must not be empty" })}
                placeholder="Enter the first option here"
              />
            </Flex>
          </Stack>
        </RadioGroup>
      </Box>
      <Flex justifyContent="flex-end" paddingTop={8}>
        <Button type="submit">{isEditMode ? "Update" : "Add"} Question</Button>
      </Flex>
    </Box>
  );
};

const QuestionListingPage = () => {
  const { id: courseId, assessmentId } = useParams();
  const { assessment, isLoading, error } = useAssessmentPreview(
    null,
    assessmentId
  );
  const isExamination = /examination/i.test(window.location.search);

  const questions = assessment?.questions;

  const questionsIsEmpty =
    !isLoading && !error && !questions?.length ? true : false;

  return (
    <Box padding={6} width="70%">
      {isLoading && <PageLoaderLayout height="70%" width="100%" />}

      {questionsIsEmpty && (
        <PageLoaderLayout height="70%" width="100%">
          <Heading as="h3" marginBottom={3}>
            No Questions Asked Yet
          </Heading>
          <Text as="level3" marginBottom={7}>
            Be the first to ask a question.
          </Text>
        </PageLoaderLayout>
      )}

      {error && (
        <PageLoaderLayout height="70%" width="100%">
          <Heading as="h3" marginBottom={3} color="red.500">
            {capitalizeWords(error)}
          </Heading>
        </PageLoaderLayout>
      )}

      {questions?.map((q) => (
        <QuestionCard
          key={q.id}
          id={q.id}
          questionNumber="Question 01"
          question={q.question}
          marginY={2}
        />
      ))}

      <Box paddingTop={10}>
        <Button
          link={`/admin/courses/${courseId}/assessment/${assessmentId}/questions/new${
            isExamination ? "?examination=true" : ""
          }`}
        >
          Add Another Question
        </Button>
      </Box>
    </Box>
  );
};

const QuestionCard = ({ questionNumber, question, id, ...rest }) => {
  const { id: courseId, assessmentId } = useParams();
  const isExamination = /examination/i.test(window.location.search);
  const editLink = `/admin/courses/${courseId}/assessment/${assessmentId}/questions/${id}${
    isExamination ? "?examination=true" : ""
  }`;

  return (
    <Flex
      {...rest}
      alignItems="center"
      justifyContent="space-between"
      backgroundColor="white"
      padding={6}
    >
      <Box>
        <Heading fontSize="heading.h4">
          <Link href={editLink}>{questionNumber}</Link>
        </Heading>
        <Text paddingTop={2} color="accent.3">
          {question}
        </Text>
      </Box>

      <MoreIconButton editLink={editLink} />
    </Flex>
  );
};

export const MoreIconButton = ({ editLink }) => {
  const { push } = useHistory();

  const handleEditClick = () => {
    push(editLink);
  };

  return (
    <Menu placement="bottom-end">
      <MenuButton
        padding={2}
        rounded="full"
        _hover={{
          background: "none",
          color: "others.3",
        }}
        _focus={{ border: "none", background: "white" }}
      >
        <FiMoreHorizontal />
      </MenuButton>

      <MenuList position="relative" zIndex={2}>
        <MenuItem onClick={handleEditClick}>Edit question</MenuItem>
        <MenuItem>Delete question</MenuItem>
      </MenuList>
    </Menu>
  );
};

const buildOptions = (data) => {
  const options = [];

  for (const item in data) {
    if (Object.hasOwnProperty.call(data, item) && /option/.test(item)) {
      const name = data[item];
      const optionIndex = +item.replace("option-", "");
      const isAnswer = +data.answer === optionIndex;

      const option = {
        name,
        isAnswer,
        optionIndex,
      };

      options.push(option);
    }
  }

  return options;
};

const QuestionsPageRoute = ({ ...rest }) => {
  return <Route {...rest} render={(props) => <QuestionsPage {...props} />} />;
};

export default QuestionsPageRoute;
