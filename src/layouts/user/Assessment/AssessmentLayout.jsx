import { useEffect } from "react";
import { Box, Flex, Grid, HStack, Stack } from "@chakra-ui/layout";
import { Radio, RadioGroup } from "@chakra-ui/radio";
import { Route } from "react-router-dom";
import { Button, Clock, Heading, Text } from "../../../components";
import breakpoints from "../../../theme/breakpoints";
import { PageLoaderLayout } from "../../global/PageLoader/PageLoaderLayout";
import useAssessment from "./hooks/useAssessment";
import { CustomModal } from "./Modal";
import parseMs from "../../../utils/parseMs";

const AssessmentLayout = () => {
  const {
    assessment,
    course_id,
    currentQuestion,
    disablePreviousQuestion,
    // error,
    isLoading,
    modalManager,
    shouldSubmit,
    selectedAnswers,
    startDate,
    duration,
    handleSubmitConfirmation,
    handleQuestionChange,
    handleNextQuestion,
    handlePreviousQuestion,
    handleOptionSelect,
    handleSubmit,
    handleAfterSubmit,
    submitStatus,
  } = useAssessment();

  // Handle Late/TooEarly comer :)

  const isElapsed =
    Date.now() > new Date(startDate).getTime() + (duration) * 60 * 1000;
  const stillTooSoon = Date.now() < new Date(startDate).getTime();

  const error = stillTooSoon
    ? "This assessment is not yet time to be taken"
    : isElapsed
    ? "This assessment has already ended"
      : null;

  useEffect(() => {
    if (isElapsed) {
      handleSubmit();
    }
  }, [isElapsed]);

  useEffect(() => {
    if (submitStatus.success) {
      handleAfterSubmit();
    }
  }, [submitStatus.success]);
 
 

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

                {duration ? (
                  <Clock
                    duration={duration * 60}
                    startAt={
                      (duration -
                        parseMs(Date.now() - new Date(startDate).getTime())
                          .minutes) *
                      60 *
                      1000
                    }
                  />
                ) : null}
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
        <CustomModal
          onClose={modalManager.onClose}
          canClose={modalManager.canClose}
          isOpen={modalManager.isOpen}
          prompt={modalManager.prompt}
        >
          {modalManager.content}
        </CustomModal>
      </>
    );

  return renderContent();
};;

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
      as="button"
      cursor="pointer"
      onClick={onClick}
      transition=".1s"
      border={isCurrent ? "2px" : "1px"}
      transform={isCurrent && "scale(1.05)"}
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
