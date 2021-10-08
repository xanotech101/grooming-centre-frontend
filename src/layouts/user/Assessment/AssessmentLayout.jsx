import { Box, Flex, Grid, HStack, Stack } from "@chakra-ui/layout";
import { Radio, RadioGroup } from "@chakra-ui/radio";
import { useEffect, useState } from "react";
import { Route } from "react-router-dom";
import { Button, Heading, Text } from "../../../components";
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

const useAssessment = () => {
  const { assessment, isLoading, error } = useAssessmentPreview();

  assessment.questions = sortByIndexField(
    assessment.questions,
    "questionIndex"
  );

  assessment.questions?.forEach((question) => {
    question.options = sortByIndexField(question.options, "optionIndex");
  });

  const [currentQuestion, setCurrentQuestion] = useState({});

  useEffect(() => {
    console.log("effect", assessment.questions);
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
    isLoading,
    error,
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
    currentQuestion,
    error,
    isLoading,
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

  return isLoading ? (
    <PageLoaderLayout />
  ) : error ? (
    <PageLoaderLayout>
      <Heading>{error}</Heading>
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
                  01
                </Text>
                <Text color="accent.2">hours</Text>
              </Box>

              <Box textAlign="center">
                <Text bold as="level1">
                  12
                </Text>
                <Text color="accent.2">minutes</Text>
              </Box>

              <Box textAlign="center">
                <Text bold as="level1">
                  30
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
                      currentQuestion?.questionIndex === question.questionIndex
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
