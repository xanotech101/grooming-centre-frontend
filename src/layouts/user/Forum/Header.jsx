import { Flex, HStack } from "@chakra-ui/react";
import { Button } from "../../../components";

const Header = ({ ...rest }) => {
  return (
    <Flex {...rest}>
      <HStack alignSelf="flex-start" spacing={1} flex={1}>
        <Button sm>New</Button>
        <Button ghost sm backgroundColor="secondary.05">
          Top
        </Button>
        <Button ghost sm backgroundColor="secondary.05">
          Hot
        </Button>
        <Button ghost sm backgroundColor="secondary.05">
          Closed
        </Button>
      </HStack>

      <Button>Ask a question</Button>
    </Flex>
  );
};

export default Header;
