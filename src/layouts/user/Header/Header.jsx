import { ButtonGroup, IconButton } from "@chakra-ui/button";
import { Flex, HStack } from "@chakra-ui/layout";
import { MdNotificationsActive } from "react-icons/md";
import { BrandLogo, Button, SearchBar } from "../../../components";
import NavBar from "./NavBar";

const Header = () => {
  return (
    <Flex
      alignItems="center"
      justifyContent="space-between"
      paddingX={5}
      shadow="md"
      minHeight="60px"
    >
      <HStack spacing={5}>
        <BrandLogo sm marginRight={5} />

        <SearchBar width="400px" />
      </HStack>

      <NavBar />

      <ButtonGroup spacing={5}>
        <BrandLogo sm />

        <Button asIcon>
          <MdNotificationsActive />
        </Button>
      </ButtonGroup>
    </Flex>
  );
};

export default Header;
