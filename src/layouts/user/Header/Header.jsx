import { ButtonGroup } from "@chakra-ui/button";
import { Box, Flex, HStack } from "@chakra-ui/layout";
import { MdNotificationsActive } from "react-icons/md";
import { BrandLogo, Button, Image, SearchBar } from "../../../components";
import { maxWidthStyles_userPages } from "../../../theme/breakpoints";
import NavBar from "./NavBar";

const Header = () => {
  return (
    <Box shadow="md">
      <Flex
        alignItems="center"
        justifyContent="space-between"
        minHeight="60px"
        {...maxWidthStyles_userPages}
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
    </Box>
  );
};

export default Header;
