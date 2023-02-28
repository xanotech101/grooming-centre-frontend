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
      marginLeft={{base:"0", lg:"250px", md:"250px"}}
    >
      <Flex alignItems="center" {...maxWidthStyles_userPages} justifyContent="center">
        <Box textAlign="center">
          GROOMING CENTRE E-LEARNING SUITE © 2022 All rights reversed
        </Box>
      </Flex>
    </Box>
  );
};

export default Footer;
