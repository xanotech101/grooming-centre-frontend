import { ButtonGroup, IconButton } from "@chakra-ui/button";
import { Box, Flex, HStack } from "@chakra-ui/layout";
import {
  Menu,
  MenuButton,
  MenuDivider,
  MenuGroup,
  MenuItem,
  MenuList,
} from "@chakra-ui/menu";
import { MdNotificationsActive } from "react-icons/md";
import avatarImagePlaceholder from "../../../assets/images/Avatar.svg";
import { BrandLogo, Button, Image, SearchBar } from "../../../components";
import { useApp } from "../../../contexts";
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
          <Avatar />

          <Button asIcon>
            <MdNotificationsActive />
          </Button>
        </ButtonGroup>
      </Flex>
    </Box>
  );
};

const Avatar = () => {
  const { handleLogout } = useApp();

  return (
    <Menu>
      <MenuButton as={IconButton} colorScheme="pink" isRound>
        <Image rounded="full" boxSize="40px" src={avatarImagePlaceholder} />
      </MenuButton>

      <MenuList position="relative" zIndex={2}>
        <MenuGroup title="Profile">
          <MenuItem>My Account</MenuItem>
          <MenuItem>Certificates</MenuItem>
          <MenuItem>Examination</MenuItem>
        </MenuGroup>
        <MenuDivider />
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </MenuList>
    </Menu>
  );
};

export default Header;
