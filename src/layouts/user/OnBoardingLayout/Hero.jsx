import { Box, Flex } from "@chakra-ui/layout";

const Hero = () => {
  return (
    <Flex flexDirection="column" flex={1} border="1px">
      <Box border="1px solid red" flex={1.2}></Box>

      <Box border="1px solid blue" flex={0.8}></Box>
    </Flex>
  );
};

export default Hero;
