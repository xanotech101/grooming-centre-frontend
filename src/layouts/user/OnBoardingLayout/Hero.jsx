import { Image } from "@chakra-ui/image";
import { Box, Flex, HStack } from "@chakra-ui/layout";
import onBoardingImage from "../../../assets/images/onboarding1.png";
import { Heading, Text } from "../../../components";

const Hero = () => {
  return (
    <Flex flexDirection="column" flex={1}>
      <Box flex={1.5} backgroundColor="primary.hover" position="relative">
        <Image
          position="absolute"
          height="100%"
          width="100%"
          objectFit="cover"
          src={onBoardingImage}
          opacity={0.65}
        />
      </Box>

      <Flex
        flex={1}
        backgroundColor="secondary.8"
        color="white"
        flexDirection="column"
        justifyContent="center"
        textAlign="center"
      >
        <Flex
          flexDirection="column"
          alignItems="center"
          marginTop="-10"
          padding={10}
        >
          <Box paddingTop={10} marginBottom={16}>
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
    </Flex>
  );
};

export default Hero;
