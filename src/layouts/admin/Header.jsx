import { ButtonGroup } from "@chakra-ui/button";
import { Flex } from "@chakra-ui/layout";
import { AiFillPlusCircle } from "react-icons/ai";
import { FiSettings } from "react-icons/fi";
import { MdNotificationsActive } from "react-icons/md";
import { Brand, Button, SearchBar } from "../../components";

const Header = () => {
  return (
    <Flex
      as="header"
      height="60px"
      paddingX={8}
      backgroundColor="primary.base"
      justifyContent="space-between"
      alignItems="center"
    >
      <Flex alignItems="center" flex={0.8} maxWidth="1000px">
        <Brand sm textColor="white" />

        <SearchBar marginLeft={10} adminHeaderStyle flex={1} />
      </Flex>

      <ButtonGroup>
        <Button asIcon ghost reversePrimaryColor largeSize>
          <AiFillPlusCircle />
        </Button>

        <Button asIcon ghost reversePrimaryColor largeSize>
          <MdNotificationsActive />
        </Button>

        <Button asIcon ghost reversePrimaryColor largeSize>
          <FiSettings />
        </Button>
      </ButtonGroup>
    </Flex>
  );
};

export default Header;
