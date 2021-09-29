import { Flex } from "@chakra-ui/layout";
import { Text } from "../../components";

const Footer = () => {
  return (
    <Flex
      as="footer"
      backgroundColor="primary.base"
      color="white"
      height="100px"
      alignItems="center"
      paddingX={5}
    >
      <Text as="level1">All rights reserved</Text>
    </Flex>
  );
};

export default Footer;
