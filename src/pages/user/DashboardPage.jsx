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
import { BiCertification } from "react-icons/bi";
import { BsGraphUp } from "react-icons/bs";
import { GiUpgrade } from "react-icons/gi";
import { RiBarChartFill } from "react-icons/ri";
import { Route } from "react-router-dom";
import { Button, Heading, Link, Text } from "../../components";
import { CoursesRowLayout } from "../../layouts";

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

const DashboardPage = () => {
  return (
    <Stack spacing={16}>
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
