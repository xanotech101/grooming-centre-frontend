import { useToast } from "@chakra-ui/toast";
import { Flex, Box, Grid } from "@chakra-ui/layout";
import { Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/menu";
import { Route } from "react-router-dom";
import {
  RichText,
  Input,
  Heading,
  Text,
  Button,
  Link,
  RichTextToView,
} from "../../../../../components";
import { useForm } from "react-hook-form";
import { Stack } from "@chakra-ui/react";
import { useHistory, useParams } from "react-router";
import { useRichText, useQueryParams } from "../../../../../hooks";
import { capitalizeFirstLetter, capitalizeWords } from "../../../../../utils";
import { FiMoreHorizontal } from "react-icons/fi";
import {
  adminCreateAssessmentQuestion,
  adminCreateExaminationQuestion,
  adminEditAssessmentQuestion,
  adminEditExaminationQuestion,
} from "../../../../../services";
import useAssessmentPreview from "../../../../user/Courses/TakeCourse/hooks/useAssessmentPreview";
import { PageLoaderLayout } from "../../../../../layouts";
import { useCallback, useEffect, useState } from "react";

const QuestionsPage = () => {
  const isQuestionListingPage = useQueryParams().get("question-listing");
  const { id: courseId, assessmentId, questionId } = useParams();
  const isExamination = useQueryParams().get("examination");

  console.log(isExamination);

  const assessmentManager = useAssessmentPreview(null, assessmentId, true);

  return (
    <>
      <Heading fontSize="heading.h3" paddingTop={3} paddingX={6}>
        {isQuestionListingPage
          ? null
          : questionId === "new"
          ? "Create "
          : "Update "}
        {isExamination ? "Examination" : "Assessment"}
      </Heading>

      <Flex>
        {isQuestionListingPage ? (
          <QuestionListingPage {...assessmentManager} />
        ) : (
          <CreateQuestionPage {...assessmentManager} />
        )}

        <Box padding={6} width="30%">
          <Box
            paddingTop="20px"
            paddingX="20px"
            paddingBottom="60px"
            backgroundColor="white"
            height={240}
          >
            <Flex
              justifyContent="space-between"
              borderBottom="1px"
              borderColor="accent.1"
              mb={5}
              pb={3}
            >
              <Heading fontSize="heading.h5">List Of Questions</Heading>

              <Link
                href={getQuestionListingLink(
                  courseId,
                  assessmentId,
                  isExamination
                )}
              >
                <Text bold color="primary.base">
                  See All
                </Text>
              </Link>
            </Flex>

            <Grid templateColumns="repeat(5, 1fr)" gap={2}>
              {assessmentManager.assessment?.questions?.map(
                (question, index) => (
                  <ButtonNavItem
                    key={index}
                    number={index + 1}
                    isCurrent={questionId === question.id}
                    answered={questionId === question.id}
                    link={getEditQuestionLink(
                      courseId,
                      assessmentId,
                      question.id,
                      isExamination
                    )}
                  />
                )
              )}
            </Grid>
          </Box>
        </Box>
      </Flex>
    </>
  );
};

const ButtonNavItem = ({ number, answered, isCurrent, link }) => {
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
    <Link href={link}>
      <Flex
        justifyContent="center"
        boxSize="40px"
        rounded="4px"
        alignItems="center"
        as="button"
        cursor="pointer"
        transition=".1s"
        border={isCurrent ? "2px" : "1px"}
        transform={isCurrent && "scale(1.05)"}
        {...styleProps}
      >
        <Text bold as="level1">
          {number}
        </Text>
      </Flex>
    </Link>
  );
};

const useQuestionDetails = (assessmentManager) => {
  const [question, setQuestion] = useState(null);
  const { questionId } = useParams();

  const getQuestions = useCallback(() => {
    if (assessmentManager.assessment?.questions) {
      let index;

      const question = assessmentManager.assessment.questions.find((q, i) => {
        const foundQuestion = q.id === questionId;
        if (foundQuestion) index = i;

        return foundQuestion;
      });

      if (question) setQuestion({ ...question, index });
    }
  }, [assessmentManager.assessment?.questions, questionId]);

  // Handle fetch category
  useEffect(() => {
    getQuestions();
  }, [getQuestions]);

  const toast = useToast();

  useEffect(() => {
    if (assessmentManager.error) {
      toast.closeAll();

      toast({
        description: capitalizeFirstLetter(
          "there was an error filling the form, reload the page!"
        ),
        position: "top",
        status: "error",
        duration: 60000,
      });
    }
  }, [assessmentManager.error, toast]);

  console.log(question);

  return {
    question,
    isLoading: assessmentManager.isLoading,
    error: assessmentManager.error,
  };
};

const CreateQuestionPage = (assessmentManager) => {
  const { push } = useHistory();
  const toast = useToast();
  const { id: courseId, assessmentId, questionId } = useParams();
  const isExamination = useQueryParams().get("examination");

  const isEditMode = questionId && questionId !== "new";

  const { question, isLoading, error } = useQuestionDetails(assessmentManager);

  const {
    register,
    reset,
    handleSubmit,
    setValue,
    formState: { isSubmitting },
  } = useForm();
  const [answer, setAnswer] = useState();

  const handleChange = (event) => {
    setAnswer(event.target.value);
  };
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

  // const { handleDelete } = useCache();
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
            examinationId: isExamination,
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
              // active: true,
            },
            options: options.map((opt) => ({
              ...opt,
              id: question?.options.find(({ name }) => opt.name === name)?.id,
              assessmentQuestionId: questionId,
              // active: true,
            })),
          })
        : isEditMode && isExamination
        ? adminEditExaminationQuestion({
            question: {
              id: questionId,
              question: questionText,
              examinationId: isExamination,
              active: true,
            },
            options: options.map((opt) => ({
              ...opt,
              id: question?.options.find(({ name }) => opt.name === name)?.id,
              examinationQuestionId: questionId,
              active: true,
            })),
          })
        : isExamination
        ? adminCreateExaminationQuestion(body)
        : adminCreateAssessmentQuestion(body));

      toast({
        description: capitalizeFirstLetter(message),
        position: "top",
        status: "success",
      });

      // Clean UP
      reset();

      assessmentManager.handleFetch(true);
      push(getQuestionListingLink(courseId, assessmentId, isExamination));
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
          label={getQuestionNumber(
            question && questionId !== "new"
              ? question.index
              : assessmentManager.assessment?.questions?.length
          )}
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
        {/* <fieldset onChange={setAnswer} id="radio" value={answer}> */}
        <Stack direction="column">
          <Flex flexDirection="row" paddingBottom={6}>
            <Flex paddingTop={12} paddingRight={6}>
              <input
                type="radio"
                checked={answer === "1"}
                onChange={handleChange}
                name="radio"
                value="1"
                id="radio-1"
              />
            </Flex>
            <Input
              id="option-1"
              label="Option 01"
              {...register("option-1", { required: "must not be empty" })}
              placeholder="Enter the first option here"
            />
          </Flex>

          <Flex flexDirection="row" paddingBottom={6}>
            <Flex paddingTop={12} paddingRight={6}>
              <input
                type="radio"
                checked={answer === "2"}
                onChange={handleChange}
                name="radio"
                value="2"
                id="radio-2"
              />
            </Flex>
            <Input
              id="option-2"
              label="Option 02"
              {...register("option-2", { required: "must not be empty" })}
              placeholder="Enter the first option here"
            />
          </Flex>

          <Flex flexDirection="row" paddingBottom={6}>
            <Flex paddingTop={12} paddingRight={6}>
              <input
                type="radio"
                checked={answer === "3"}
                onChange={handleChange}
                name="radio"
                value="3"
                id="radio-3"
              />
            </Flex>
            <Input
              id="option-3"
              label="Option 03"
              {...register("option-3", { required: "must not be empty" })}
              placeholder="Enter the first option here"
            />
          </Flex>
          <Flex flexDirection="row" paddingBottom={6}>
            <Flex paddingTop={12} paddingRight={6}>
              <input
                type="radio"
                checked={answer === "4"}
                onChange={handleChange}
                name="radio"
                value="4"
                id="radio-4"
              />
            </Flex>
            <Input
              id="option-4"
              label="Option 04"
              {...register("option-4", { required: "must not be empty" })}
              placeholder="Enter the first option here"
            />
          </Flex>
        </Stack>
        {/* </fieldset> */}
      </Box>
      <Flex justifyContent="flex-end" paddingTop={8}>
        <Button
          type="submit"
          disabled={isLoading || isSubmitting || error}
          isLoading={isLoading || isSubmitting}
        >
          {isEditMode ? "Update" : "Add"} Question
        </Button>
      </Flex>
    </Box>
  );
};

const QuestionListingPage = ({ assessment, isLoading, error }) => {
  const { id: courseId, assessmentId } = useParams();

  const isExamination = useQueryParams().get("examination");

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

      {questions?.map((q, index) => (
        <QuestionCard
          key={q.id}
          id={q.id}
          questionNumber={getQuestionNumber(index)}
          question={q.question}
          marginBottom={4}
        />
      ))}

      <Box paddingTop={10}>
        <Button
          link={`/admin/courses/${courseId}/assessment/${assessmentId}/questions/new${
            isExamination ? `?examination=${isExamination}` : ""
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
  const isExamination = useQueryParams().get("examination");
  const editLink = getEditQuestionLink(
    courseId,
    assessmentId,
    id,
    isExamination
  );

  return (
    <Flex
      {...rest}
      alignItems="stretch"
      justifyContent="space-between"
      backgroundColor="white"
      padding={6}
    >
      <Box>
        <Heading fontSize="text.level2">
          <Link href={editLink}>{questionNumber}</Link>
        </Heading>

        <RichTextToView paddingTop={2} text={question} />
      </Box>

      <Box transform="translateY(-10px)">
        <MoreIconButton editLink={editLink} />
      </Box>
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

const getQuestionListingLink = (courseId, assessmentId, isExamination) =>
  `/admin/courses/${courseId}/assessment/${assessmentId}/questions/list?question-listing=true${
    isExamination ? `&examination=${isExamination}` : ""
  }`;

const getEditQuestionLink = (
  courseId,
  assessmentId,
  questionId,
  isExamination
) => {
  return `/admin/courses/${courseId}/assessment/${assessmentId}/questions/${questionId}${
    isExamination ? `?examination=${isExamination}` : ""
  }`;
};

const getQuestionNumber = (index) =>
  `Question ${
    index + 1 < 9 ? `0${index + 1}` : index === undefined ? "01" : index + 1
  }`;

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
