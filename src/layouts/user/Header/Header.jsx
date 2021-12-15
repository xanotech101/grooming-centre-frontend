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
import { BrandLogo, Button, Image } from "../../../components";
import { useApp } from "../../../contexts";
import { maxWidthStyles_userPages } from "../../../theme/breakpoints";
import NavBar from "./NavBar";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <Box shadow="md">
      <Flex
        alignItems="center"
        justifyContent="space-between"
        minHeight="60px"
        {...maxWidthStyles_userPages}
      >
        <HStack spacing={{ base: 2, laptop: 5 }} flex={1}>
          <BrandLogo sm marginRight={{ base: 2, laptop: 5 }} />

          {/* <SearchBar width="400px" display={{ base: "none", tablet: "flex" }} /> */}
        </HStack>

        <NavBar
          display={{ base: "none", tablet: "flex" }}
          flex={1}
          marginRight={5}
        />
        {/* <NavBar display={{ base: "none", laptop: "flex" }} flex={1} /> */}

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
  const { handleLogout, state, getOneMetadata } = useApp();

  const isAdmin = () => {
    const role = getOneMetadata("userRoles", state.user.userRoleId);

    if (/admin/i.test(role?.name)) return true;
  };

  return (
    <Menu>
      <MenuButton as={IconButton} isRound>
        <Image
          rounded="full"
          boxSize="40px"
          src={state.user?.profilePics || avatarImagePlaceholder}
        />
      </MenuButton>

      <MenuList position="relative" zIndex={2}>
        <MenuGroup title="Profile">
          <MenuItem>My Account</MenuItem>
          <MenuItem>Certificates</MenuItem>
          <MenuItem>Examination</MenuItem>
          <MenuItem as={Link} to="/courses/grade-overview">
            Grades
          </MenuItem>
          {state.user && isAdmin() && (
            <MenuItem as={Link} to="/admin">
              Admin Dashboard
            </MenuItem>
          )}
        </MenuGroup>
        <MenuDivider />
        <MenuItem onClick={handleLogout} color="secondary.6">
          Logout
        </MenuItem>
      </MenuList>
    </Menu>
  );
};

export default Header;
