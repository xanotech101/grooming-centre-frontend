import {
  Box,
  Flex,
  Grid,
  GridItem,
  HStack,
  Icon,
  Stack,
} from "@chakra-ui/react";
import { Skeleton } from "@chakra-ui/skeleton";
import { BsGraphUp } from "react-icons/bs";
import { Route } from "react-router-dom";
import { Heading, Link, Text } from "../../components";

const DashboardPage = () => {
  return (
    <Stack spacing={16}>
      <Flex justifyContent="space-between" alignItems="center">
        <Box>
          <Heading as="h1" fontSize="heading.h2" color="primary.base">
            Hi John!
          </Heading>
          <Text bold as="level1" color="accent.3">
            Welcome back, nice to see you again!
          </Text>
        </Box>

        <Flex
          justifyContent="space-between"
          alignItems="center"
          background="primary.base"
          rounded="10px"
          padding={5}
          height="175px"
        >
          <Text bold fontSize="heading.h3" color="white" width="340px">
            Here is what you have scheduled for Today.
          </Text>

          <HStack spacing={2}>
            <Flex
              flexDirection="column"
              justifyContent="center"
              alignItems="center"
              boxSize="125px"
              rounded="5px"
              backgroundColor="white"
            >
              <Text bold as="level2">
                3
              </Text>
              <Text>Assessments</Text>
            </Flex>
            <Flex
              flexDirection="column"
              justifyContent="center"
              alignItems="center"
              boxSize="125px"
              rounded="5px"
              backgroundColor="white"
            >
              <Text bold as="level2">
                2
              </Text>
              <Text>Lessons</Text>
            </Flex>
            <Flex
              flexDirection="column"
              justifyContent="center"
              alignItems="center"
              boxSize="125px"
              rounded="5px"
              backgroundColor="white"
            >
              <Text bold as="level2">
                4
              </Text>
              <Text>Events</Text>
            </Flex>
          </HStack>
        </Flex>
      </Flex>

      <Flex>
        <Section title="Overview" flex={1} marginRight={10}>
          <Grid templateColumns=".6fr .6fr 1fr 1fr" columnGap={4} rowGap={10}>
            {/* First Row */}
            <MiniBox padding={3}>
              <Icon color="accent.3" fontSize="text.level1" marginBottom={5}>
                <BsGraphUp />
              </Icon>

              <Text bold as="level1">
                400
              </Text>
              <Text color="accent.3">Total Grade</Text>
            </MiniBox>
            <MiniBox padding={3}>
              <Icon color="accent.3" fontSize="text.level1" marginBottom={5}>
                <BsGraphUp />
              </Icon>

              <Text bold as="level1">
                400
              </Text>
              <Text color="accent.3">Certifications</Text>
            </MiniBox>
            <MiniBox padding={3} as={GridItem} colSpan={2}>
              <Text color="accent.3">Time Spent</Text>
            </MiniBox>

            {/* Second Row */}
            <MiniBox
              padding={3}
              as={GridItem}
              colSpan={2}
              display="flex"
              flexDirection="column"
              justifyContent="space-between"
            >
              <Flex justifyContent="space-between" marginBottom={10}>
                <Text color="accent.3">Badges</Text>

                <Text bold as="level1">
                  20
                </Text>
              </Flex>

              <Box>
                <Grid
                  templateColumns="repeat(4, 1fr)"
                  autoRows="70px"
                  gap={2}
                  marginBottom={2}
                >
                  {[1, 2, 3, 4, 5, 6, 7, 8].map((color, index) => (
                    <Box
                      key={index}
                      backgroundColor={`hsl(${Math.floor(
                        Math.random() * 360
                      )}, 100%, 70%)`}
                    />
                  ))}
                </Grid>

                <Flex justifyContent="flex-end">
                  <Link href="#">
                    <Text bold color="primary.base">
                      View all badges
                    </Text>
                  </Link>
                </Flex>
              </Box>
            </MiniBox>

            <MiniBox
              padding={3}
              as={GridItem}
              colSpan={2}
              display="flex"
              flexDirection="column"
            >
              <Box marginBottom={5}>
                <Text color="accent.3">Total Courses</Text>

                <Flex alignItems="center">
                  <Text bold as="level1" marginRight={2}>
                    22
                  </Text>

                  <Text as="level5" color="accent.5" m>
                    +1 New
                  </Text>
                </Flex>
              </Box>

              {/* TODO: integrate doughnut chart */}
              <Grid backgroundColor="accent.1" placeItems="center" flex={1}>
                <Text>Doughnut chart :)</Text>
              </Grid>
            </MiniBox>

            <MiniBox
              padding={3}
              as={GridItem}
              colSpan={4}
              display="flex"
              flexDirection="column"
              minHeight="300px"
            >
              <Box marginBottom={5}>
                <Text color="accent.3">Hours Spent</Text>

                <Flex alignItems="center">
                  <Text bold as="level1" marginRight={2}>
                    22h 40min
                  </Text>

                  <Text as="level5" color="secondary.4" m>
                    +1 New
                  </Text>
                </Flex>
              </Box>

              {/* TODO: integrate bar chart */}
              <Flex
                backgroundColor="secondary.1"
                justifyContent="center"
                alignItems="center"
                flex={1}
              >
                <Text>Bar chart :)</Text>
              </Flex>
            </MiniBox>
          </Grid>
        </Section>

        <Section title="Calendar" flexBasis="374px">
          <MiniBox
            as={Skeleton}
            flex={1}
            minHeight="386px"
            marginBottom={7}
          ></MiniBox>
          <MiniBox as={Skeleton} flex={1} minHeight="386px"></MiniBox>
        </Section>
      </Flex>

      <Section border="1px" title="Ongoing Courses"></Section>

      <Section border="1px" title="Completed Courses"></Section>
    </Stack>
  );
};

const Section = ({ title, children, ...rest }) => {
  return (
    <Box as="section" {...rest}>
      <Box as="header" marginBottom={5}>
        <Heading fontSize="heading.h3">{title}</Heading>
      </Box>

      {children}
    </Box>
  );
};

const MiniBox = ({ children, ...rest }) => {
  return (
    <Box
      shadow="0px 2px 4px rgba(0, 0, 0, 0.2)"
      border="1px"
      borderColor="#fafafa"
      rounded="8px"
      overflow="hidden"
      position="relative"
      {...rest}
    >
      {children}
    </Box>
  );
};

export const DashboardPageRoute = ({ ...rest }) => {
  return <Route {...rest} render={(props) => <DashboardPage {...props} />} />;
};
