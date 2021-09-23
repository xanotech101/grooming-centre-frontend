import { Box, Flex, Grid, HStack, Stack } from "@chakra-ui/layout";
import { Radio, RadioGroup } from "@chakra-ui/radio";
import { Route } from "react-router-dom";
import { Button, Heading, Text } from "../../../components";
import breakpoints from "../../../theme/breakpoints";

const AssessmentLayout = () => {
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

  return (
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
            HTML Assessment
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
            {renderSubHeading("Question 1 of 20")}
            <Flex
              flexDirection="column"
              justifyContent="space-between"
              as="form"
              flex={1}
              // minHeight="500px"
            >
              <Text marginBottom={6} flex={0.2}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Amet,
                eros cursus nunc integer amet donec rhoncus ut posuere?
              </Text>

              <RadioGroup defaultValue="1" marginBottom={8} flex={1}>
                <Stack spacing={4}>
                  <Radio value="1">
                    <Text>Lorem Ipsum</Text>
                  </Radio>
                  <Radio value="2">
                    <Text>Lorem Ipsum</Text>
                  </Radio>
                  <Radio value="3">
                    <Text>Lorem Ipsum</Text>
                  </Radio>
                  <Radio value="4">
                    <Text>Lorem Ipsum</Text>
                  </Radio>
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

              <Flex justifyContent="space-between" marginBottom={2}>
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
                {Array(9)
                  .fill()
                  .map((_, index) => (
                    <Flex
                      key={index}
                      alignItems="center"
                      justifyContent="center"
                      boxSize="40px"
                      rounded="4px"
                      backgroundColor="primary.base"
                      color="white"
                      border="1px"
                      borderColor="transparent"
                    >
                      <Text bold as="level">
                        {index + 1}
                      </Text>
                    </Flex>
                  ))}

                <Flex
                  alignItems="center"
                  justifyContent="center"
                  boxSize="40px"
                  rounded="4px"
                  border="1px"
                  borderColor="primary.base"
                >
                  <Text bold as="level">
                    10
                  </Text>
                </Flex>
              </Grid>
            </Box>
          </Box>
        </Flex>
      </Box>
    </Flex>
  );
};

export const AssessmentLayoutRoute = ({ ...rest }) => {
  return (
    <Route {...rest} render={(props) => <AssessmentLayout {...props} />} />
  );
};
