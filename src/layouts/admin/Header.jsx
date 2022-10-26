import { ButtonGroup, IconButton } from "@chakra-ui/button";
import { Center, Flex } from "@chakra-ui/layout";
import {
  Menu,
  MenuButton,
  MenuGroup,
  MenuItem,
  MenuList,
} from "@chakra-ui/menu";
import { AiFillPlusCircle } from "react-icons/ai";
import { FiSettings } from "react-icons/fi";
import { MdNotificationsActive } from "react-icons/md";
import { Link } from "react-router-dom";
import { Brand, Button, SearchBar } from "../../components";

const Header = () => {
  return (
    <Flex
      as="header"
      height="60px"
      paddingX={8}
      backgroundColor="others.3"
      justifyContent="space-between"
      alignItems="center"
    >
      <Flex alignItems="center" flex={0.8} maxWidth="1000px">
        <Flex
          justifyContent="center"
          w="266px"
          ml={-8}
          bg="#FFF"
          height="60px"
          alignItems="center"
          borderBottom="1px"
          borderColor="gray.200"
        >
          <Brand sm textColor="white" />
        </Flex>

        {/* <SearchBar marginLeft={10} adminLayoutHeaderStyle flex={1} /> */}
      </Flex>

      <ButtonGroup>
        <QuickAccess />

        <Button asIcon ghost reversePrimaryColor largeSize>
          <MdNotificationsActive />
        </Button>

        <Button
          link={`/admin/settings`}
          asIcon
          ghost
          reversePrimaryColor
          largeSize
        >
          <FiSettings />
        </Button>
      </ButtonGroup>
    </Flex>
  );
};

const QuickAccess = () => {
  return (
    <Menu>
      <MenuButton
        as={IconButton}
        isRound
        backgroundColor="others.3"
        _hover={{ backgroundColor: "others.3" }}
        _active={{ backgroundColor: "others.3" }}
      >
        <Center>
          <AiFillPlusCircle color="white" size="24px" />
        </Center>
      </MenuButton>

      <MenuList position="relative" zIndex={2}>
        <MenuGroup>
          <MenuItem as={Link} to="/admin/departments/create">
            Add Department
          </MenuItem>
          <MenuItem as={Link} to="/admin/users/edit/new">
            Add User
          </MenuItem>
          <MenuItem as={Link} to="/admin/courses/edit/new">
            Add Course
          </MenuItem>

          <MenuItem as={Link} to="/admin/events/edit/new">
            Add Event
          </MenuItem>
        </MenuGroup>
      </MenuList>
    </Menu>
  );
};

export default Header;
