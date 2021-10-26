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

const QuestionsPage = () => {
  const { register, handleSubmit } = useForm();
  const onSubmit = (data) => {
    console.log(data);
  };

  return (
      <Flex as="form" onSubmit={handleSubmit(onSubmit)} >
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
        <Box padding={6} width="30%">
          <Box
            paddingTop="20px"
            paddingX="20px"
            paddingBottom="60px"
            backgroundColor="white"
          >
            <Heading fontSize="heading.h5">Questions Overview</Heading>
          </Box>
          <Box paddingTop={6}>
            <Button secondary>Save as Draft</Button>
          </Box>
          <Box paddingTop={4}>
            <Button>Create Assessment</Button>
          </Box>
        </Box>
      </Flex>
  );
};


const QuestionsPageRoute = ({ ...rest }) => {
  return <Route {...rest} render={(props) => <QuestionsPage {...props} />} />;
};

export default QuestionsPageRoute;
