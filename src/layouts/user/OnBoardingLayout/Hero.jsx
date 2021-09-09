import { Image } from "@chakra-ui/image";
import { Box, Flex, Heading, Text, HStack } from "@chakra-ui/layout";
import onBoardingImage from "../../../assets/images/onboarding1.png";

const Hero = () => {
  return (
    <Flex flexDirection="column" flex={1}>
      <Box flex={1.5} backgroundColor="primary.base" position="relative">
        <Image
          position="absolute"
          height="100%"
          width="100%"
          objectFit="cover"
          src={onBoardingImage}
          opacity={0.7}
        />
      </Box>

      <Flex
        flex={1}
        backgroundColor="secondary.8"
        color="white"
        flexDirection="column"
        alignItems="center"
        textAlign="center"
      >
        <Box paddingTop={10} marginBottom={10}>
          <Heading as="h1" size="md" marginBottom={6}>
            Lorem Ipsum dolor
          </Heading>

          <Text maxWidth="500px">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Id
            adipiscing dui pulvinar mattis sed semper.
          </Text>
        </Box>

        <HStack spacing={5}>
          <Box boxSize="10px" rounded="full" backgroundColor="white" />
          <Box boxSize="10px" rounded="full" backgroundColor="white" />
          <Box boxSize="10px" rounded="full" backgroundColor="white" />
        </HStack>
      </Flex>
    </Flex>
  );
};

export default Hero;
