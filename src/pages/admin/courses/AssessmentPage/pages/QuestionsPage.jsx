import { useToast } from "@chakra-ui/toast";
import { Flex, Box } from "@chakra-ui/layout";
import { Route } from "react-router-dom";
import {
  RichText,
  Input,
  Heading,
  Text,
  Button,
} from "../../../../../components";
import { useForm } from "react-hook-form";
import { Radio, RadioGroup, Stack } from "@chakra-ui/react";
import { useHistory, useParams } from "react-router";
import { useRichText, useQueryParams } from "../../../../../hooks";
import { capitalizeFirstLetter } from "../../../../../utils";
import { FiMoreHorizontal } from "react-icons/fi";

const QuestionsPage = () => {
  const { push } = useHistory();
  const toast = useToast();
  const isAddAnotherQuestion = useQueryParams().get("add-another-question");
  const { id: courseId, assessmentId } = useParams();

  const { register, handleSubmit } = useForm();
  const questionRichTextManager = useRichText();

  const onSubmit = async (data) => {
    try {
      const question =
        questionRichTextManager.handleGetValueAndValidate("Content");

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

      data = {
        assessmentId,
        question,
        options,
      };

      console.log(data);
      // const body = appendFormData(data);

      // const { message, lesson } = await (isEditMode
      //   ? adminEditLesson(lessonId, body)
      //   : adminCreateLesson(body));

      toast({
        description: capitalizeFirstLetter("created success"),
        position: "top",
        status: "success",
      });

      // push(
      //   `/admin/courses/${courseId}/assessment/${assessmentId}/questions?add-another-question=true`
      // );
    } catch (error) {
      toast({
        description: capitalizeFirstLetter(error.message),
        position: "top",
        status: "error",
      });
    }
  };

  return (
    <Flex as="form" onSubmit={handleSubmit(onSubmit)}>
      {isAddAnotherQuestion ? (
        <Box padding={6} width="70%">
          <QuestionOverviewBox
            questionNumber="Question 01"
            question="What is the meaning of what you dont know?"
          />
          <Box paddingTop={10}>
            <Button
              link={`/admin/courses/${courseId}/assessment/new/questions`}
            >
              Add Another Question
            </Button>
          </Box>
        </Box>
      ) : (
        <Box padding={6} width="70%">
          <Box
            paddingTop="20px"
            paddingX="20px"
            paddingBottom="60px"
            backgroundColor="white"
          >
            <RichText
              height="250px"
              id="content"
              label="Question 01"
              placeholder="Enter your question here"
              onChange={questionRichTextManager.handleChange}
            />
          </Box>
          <Box marginTop={10} padding={6} backgroundColor="white">
            <Heading fontSize="heading.h4">Enter the Options</Heading>
            <Text paddingTop={2} paddingBottom={8}>
              Mark the correct option
            </Text>
            <RadioGroup>
              <Stack direction="column">
                <Flex flexDirection="row" paddingBottom={6}>
                  <Radio
                    paddingTop={8}
                    paddingRight={6}
                    value="1"
                    id="radio-1"
                    {...register("answer")}
                  />
                  <Input
                    id="option-1"
                    label="Option 01"
                    {...register("option-1")}
                    placeholder="Enter the first option here"
                  />
                </Flex>

                <Flex flexDirection="row" paddingBottom={6}>
                  <Radio
                    paddingTop={8}
                    paddingRight={6}
                    value="2"
                    id="radio-2"
                    {...register("answer")}
                  />
                  <Input
                    id="option-2"
                    label="Option 02"
                    {...register("option-2")}
                    placeholder="Enter the first option here"
                  />
                </Flex>

                <Flex flexDirection="row" paddingBottom={6}>
                  <Radio
                    paddingTop={8}
                    paddingRight={6}
                    value="3"
                    id="radio-3"
                    {...register("answer")}
                  />
                  <Input
                    id="option-3"
                    label="Option 03"
                    {...register("option-3")}
                    placeholder="Enter the first option here"
                  />
                </Flex>
                <Flex flexDirection="row" paddingBottom={6}>
                  <Radio
                    paddingTop={8}
                    paddingRight={6}
                    value="4"
                    id="radio-4"
                    {...register("answer")}
                  />
                  <Input
                    id="option-4"
                    label="Option 04"
                    {...register("option-4")}
                    placeholder="Enter the first option here"
                  />
                </Flex>
              </Stack>
            </RadioGroup>
          </Box>
          <Flex justifyContent="flex-end" paddingTop={8}>
            <Button type="submit">Add Question</Button>
          </Flex>
        </Box>
      )}
      <Box padding={6} width="30%">
        <Box
          paddingTop="20px"
          paddingX="20px"
          paddingBottom="60px"
          backgroundColor="white"
          height={240}
        >
          <Heading fontSize="heading.h5">Questions Overview</Heading>
        </Box>
      </Box>
    </Flex>
  );
};

const QuestionOverviewBox = ({ questionNumber, question }) => {
  return (
    <Flex
      alignItems="center"
      justifyContent="space-between"
      backgroundColor="white"
      padding={6}
    >
      <Box>
        <Heading fontSize="heading.h4">{questionNumber}</Heading>
        <Text paddingTop={2} color="accent.3">
          {question}
        </Text>
      </Box>
      <Button
        _hover={{
          background: "none",
          color: "others.3",
        }}
        _focus={{ border: "none", background: "white" }}
        asIcon
      >
        <FiMoreHorizontal />
      </Button>
    </Flex>
  );
};

const QuestionsPageRoute = ({ ...rest }) => {
  return <Route {...rest} render={(props) => <QuestionsPage {...props} />} />;
};

export default QuestionsPageRoute;
