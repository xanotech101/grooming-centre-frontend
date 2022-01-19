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
    >
      <Flex alignItems="center" {...maxWidthStyles_userPages}>
        <Text as="level3">Grooming Centre LMS 2022 All rights reversed</Text>
      </Flex>
    </Box>
  );
};

export default Footer;
