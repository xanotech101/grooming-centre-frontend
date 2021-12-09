import { Box, Flex } from "@chakra-ui/layout";
import { Text } from "../../components";
import { maxWidthStyles_userPages } from "../../theme/breakpoints";

const Footer = () => {
  return (
    <Box
      as="footer"
      color="white"
      backgroundColor="primary.base"
      height="100px"
      padding={5}
    >
      <Flex alignItems="center" {...maxWidthStyles_userPages}>
        <Text as="level1">All rights reserved</Text>
      </Flex>
    </Box>
  );
};

export default Footer;
