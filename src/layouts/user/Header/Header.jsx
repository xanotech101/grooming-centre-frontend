import { ButtonGroup, IconButton } from "@chakra-ui/button";
import { Flex, HStack } from "@chakra-ui/layout";
import { MdNotificationsActive } from "react-icons/md";
import { BrandLogo, Button, Image, SearchBar } from "../../../components";
import NavBar from "./NavBar";

const Header = () => {
  return (
    <Flex
      alignItems="center"
      justifyContent="space-between"
      paddingX={{ base: 2, laptop: 5 }}
      shadow="md"
      minHeight="60px"
    >
      <HStack spacing={{ base: 2, laptop: 5 }}>
        <BrandLogo sm marginRight={{ base: 2, laptop: 5 }} />

        <SearchBar width="400px" display={{ base: "none", tablet: "flex" }} />
      </HStack>

      <NavBar display={{ base: "none", laptop: "flex" }} />

      <ButtonGroup spacing={{ base: 2, laptop: 5 }}>
        <Image rounded="full" boxSize="40px" isLoading />

        <Button asIcon>
          <MdNotificationsActive />
        </Button>
      </ButtonGroup>
    </Flex>
  );
};

export default Header;
