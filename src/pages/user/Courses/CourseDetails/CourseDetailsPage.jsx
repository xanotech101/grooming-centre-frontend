import { Box, Flex, HStack, Stack } from "@chakra-ui/layout";
import { Route } from "react-router-dom";
import coverImagePlaceholder from "../../../../assets/images/onboarding1.png";
import { Heading, Image, Spinner, Text } from "../../../../components";
import { useFakeLoading } from "../../../../hooks";

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
  const { title, description, instructor } = data;

  const isLoading = useFakeLoading(1000);

  return isLoading ? (
    <Flex
      // Make the height 100% of the screen minus the `height` of the Header and Footer
      height="calc(100vh - 100px - 100px)"
      justifyContent="center"
      alignItems="center"
    >
      <Spinner />
    </Flex>
  ) : (
    <Box>
      <Stack
        as="section"
        padding={10}
        spacing={7}
        backgroundColor="secondary.9"
        color="white"
      >
        <Heading> {title}</Heading>
        <Text as="level2">{description}</Text>

        <HStack spacing={4}>
          <Image
            src={instructor.image || coverImagePlaceholder}
            rounded="full"
            boxSize="40px"
          />

          <Text as="level1" bold>
            {instructor.name}
          </Text>
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
