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
import { Bar, Doughnut } from "react-chartjs-2";
import { BiCertification } from "react-icons/bi";
import { GiUpgrade } from "react-icons/gi";
import { RiBarChartFill } from "react-icons/ri";
import { Route } from "react-router-dom";
import { Button, Heading, Link, Text } from "../../components";
import { CoursesRowLayout } from "../../layouts";
import colors from "../../theme/colors";

const scheduledCards = [
  {
    title: "Assessments due",
    value: 3,
    icon: (
      <Icon fontSize="heading.h3" color="secondary.4">
        <RiBarChartFill />
      </Icon>
    ),
  },
  {
    title: "Lessons to complete",
    value: 2,
    icon: (
      <Icon fontSize="heading.h3" color="secondary.4">
        <RiBarChartFill />
      </Icon>
    ),
  },
  {
    title: "Events to attend",
    value: 4,
    icon: (
      <Icon fontSize="heading.h3" color="secondary.4">
        <RiBarChartFill />
      </Icon>
    ),
  },
];

const totalCourseChartConfig = {
  data: {
    labels: ["In Progress", "Completed", "Yet to start"],
    datasets: [
      {
        data: [12, 19, 3],
        backgroundColor: [
          colors.secondary[3],
          colors.primary.base,
          colors.accent[1],
        ],
        borderWidth: 0,
      },
    ],
  },

  options: {
    plugins: {
      legend: {
        position: "right",
      },
    },
  },
};

const hoursSpentChartConfig = {
  data: {
    labels: [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ],
    datasets: [
      {
        label: "# of Votes",
        data: [12, 10, 3, 8, 5, 15, 12],
        backgroundColor: [colors.primary.base],
        borderWidth: 0,
      },
    ],
  },

  options: {
    plugins: {
      legend: { display: false },
    },
    scales: {
      y: {
        max: 24,
      },
    },
  },
};

const DashboardPage = () => {
  return (
    <Stack spacing={16}>
      <Flex
        flexDirection={{ base: "column", laptop: "row" }}
        alignItems={{ base: "flex-start", laptop: "center" }}
        justifyContent="space-between"
      >
        <Box
          // paddingTop={{ base: 10, "laptop": 0 }}
          // paddingBottom={{ base: 10, "laptop": 0 }}
          paddingY={{ base: 10, laptop: 0 }}
        >
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
          padding={{ base: 4, "laptop-l": 5 }}
          height="175px"
        >
          <Text
            bold
            fontSize="heading.h3"
            color="white"
            width={{ base: "270px", "laptop-l": "340px" }}
          >
            Here is what you have scheduled for Today.
          </Text>

          <HStack spacing={2}>
            {scheduledCards.map(({ icon, title, value }) => (
              <Flex
                key={title}
                flexDirection="column"
                justifyContent="center"
                alignItems="center"
                boxSize={{ base: "100px", "laptop-l": "110px" }}
                rounded="5px"
                backgroundColor="white"
                shadow="md"
              >
                <Flex
                  flexDirection="column"
                  justifyContent="space-between"
                  boxSize="80px"
                >
                  <Flex justifyContent="space-between" alignItems="center">
                    <Text bold as="level1">
                      {value}
                    </Text>

                    {icon}
                  </Flex>

                  <Text>{title}</Text>
                </Flex>
              </Flex>
            ))}
          </HStack>
        </Flex>
      </Flex>

      <Flex>
        <Section title="Overview" flex={1} marginRight={10}>
          <Grid templateColumns=".6fr .6fr 1fr 1fr" columnGap={4} rowGap={10}>
            {/* First Row */}
            <MiniBox padding={3}>
              <Icon color="accent.3" fontSize="heading.h3" marginBottom={5}>
                <GiUpgrade />
              </Icon>

              <Text bold as="level1">
                400
              </Text>
              <Text color="accent.3">Total Grade</Text>
            </MiniBox>
            <MiniBox padding={3}>
              <Icon color="accent.3" fontSize="heading.h3" marginBottom={5}>
                <BiCertification />
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
              <Box>
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

              {/* <Grid placeItems="center"> */}
              <Box
                width="300px"
                height="300px"
                position="absolute"
                left="50%"
                transform="translateX(-50%)"
              >
                <Doughnut {...totalCourseChartConfig} />
              </Box>
              {/* </Grid> */}
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

              <Bar {...hoursSpentChartConfig} />
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

      <Section title="Ongoing Courses" titleSeeAllHref="#">
        <CoursesRowLayout />
      </Section>

      <Section title="Completed Courses" titleSeeAllHref="#">
        <CoursesRowLayout />
      </Section>
    </Stack>
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

const Section = ({ title, titleSeeAllHref, children, ...rest }) => {
  return (
    <Box as="section" {...rest}>
      <Flex
        as="header"
        justifyContent="space-between"
        alignItems="center"
        marginBottom={5}
      >
        <Heading fontSize="heading.h3">{title}</Heading>

        {titleSeeAllHref && (
          <Button
            link={titleSeeAllHref}
            sm
            color="primary.base"
            backgroundColor="transparent"
            _hover={{ backgroundColor: "secondary.1" }}
          >
            See All
          </Button>
        )}
      </Flex>

      {children}
    </Box>
  );
};

export const DashboardPageRoute = ({ ...rest }) => {
  return <Route {...rest} render={(props) => <DashboardPage {...props} />} />;
};
