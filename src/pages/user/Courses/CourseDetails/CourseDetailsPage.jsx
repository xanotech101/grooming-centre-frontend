import { Image } from "@chakra-ui/image";
import { Box, Flex, HStack, Stack } from "@chakra-ui/layout";
import { Route } from "react-router-dom";
import coverImagePlaceholder from "../../../../assets/images/onboarding1.png";
import { Heading, Text } from "../../../../components";

const data = {
  title: "Web Design & Development Crash Course 2021",
  description:
    "Ever wondered how other UX designers troubleshoot problems and juggle conflicting priorities? In this weekly series, Drew Bridewell—a user experience designer and leader of the digital transformation team at InVision—shares his hard-earned knowledge and shows how to apply basic UX design principles to real-world projects.",
  instructor: {
    image: null,
    name: "Travis Green",
  },
};

const CourseDetailsPage = () => {
  return (
    <Box>
      <Stack
        as="section"
        padding={10}
        spacing={7}
        backgroundColor="secondary.9"
        color="white"
      >
        <Heading> {data.title}</Heading>
        <Text as="level2">{data.description}</Text>

        <HStack spacing={4}>
          <Flex overflow="hidden" boxSize="40px" rounded="full">
            <Image
              src={data.instructor.image || coverImagePlaceholder}
              objectFit="cover"
            />
          </Flex>
          <Text as="level1" bold>
            {data.instructor.name}
          </Text>{" "}
        </HStack>
      </Stack>
    </Box>
  );
};

export const CourseDetailsPageRoute = ({ ...rest }) => {
  return (
    <Route {...rest} render={(props) => <CourseDetailsPage {...props} />} />
  );
};
