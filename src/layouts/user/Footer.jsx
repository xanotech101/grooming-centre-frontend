import { Box, Flex } from "@chakra-ui/layout";
import { Text } from "../../components";
import { maxWidthStyles_userPages } from "../../theme/breakpoints";

const Footer = () => {
  return (
    <Box
      as="footer"
      color="white"
      backgroundColor="primary.base"
      height="60px"
      padding={5}
      marginLeft={{sm:"0", lg:"250px", md:"250px"}}
    >
      <Flex alignItems="center" {...maxWidthStyles_userPages} justifyContent="center">
        <Text as="level3" >
          GROOMING CENTRE E-LEARNING SUITE © 2022 All rights reversed
        </Text>
      </Flex>
    </Box>
  );
};

export default Footer;
