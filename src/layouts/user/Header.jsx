import { Flex } from "@chakra-ui/layout";
import { BrandLogo } from "../../components";

const Header = () => {
  return (
    <Flex alignItems="center" paddingX={5} shadow="md" minHeight="60px">
      <BrandLogo sm />
    </Flex>
  );
};

export default Header;
