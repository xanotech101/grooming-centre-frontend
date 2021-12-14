import { Avatar } from "@chakra-ui/avatar";
import { Box, Flex, Stack } from "@chakra-ui/layout";
import { AiOutlinePoweroff } from "react-icons/ai";
import { Button, Heading, Link, Text } from "../../../components";
import { useApp } from "../../../contexts";
import { links, settingsLinks } from "./links";
import SidebarLink from "./SidebarLink";

const Sidebar = () => {
  const { state, getOneMetadata, handleLogout } = useApp();

  const isSettingsPage = /settings/i.test(window.location.pathname);

  return (
    <Flex
      flexDirection="column"
      as="aside"
      width="270px"
      flexShrink={0}
      paddingRight={1}
    >
      <Flex
        flexDirection="column"
        height="100%"
        backgroundColor="white"
        shadow="lg"
      >
        {isSettingsPage ? (
          <Box paddingTop={10} paddingX={5}>
            <Heading fontSize="heading.h3" paddingBottom={2}>
              Settings
            </Heading>
            <Text paddingBottom={6}>Topics: Introduction to HTML</Text>
          </Box>
        ) : (
          <Box padding={5}>
            <Stack
              as="header"
              spacing={2}
              justifyContent="center"
              alignItems="center"
              borderBottom="1px"
              borderColor="gray.200"
              height="200px"
              marginBottom={5}
              paddingBottom={5}
            >
              <Avatar
                name={state.user?.firstName + " " + state.user?.lastName}
                borderRadius="100%"
                width="100px"
                height="100px"
                src={state.user?.profilePics}
              />

              {state.user && (
                <>
                  <Link href={`/admin/users/details/${state.user.id}/profile`}>
                    <Text fontSize="heading.h3">
                      {state.user.firstName || "NotSet"} {state.user.lastName}
                    </Text>
                  </Link>

                  <Text color="gray.500" textTransform="capitalize">
                    {getOneMetadata("userRoles", state.user.userRoleId)?.name}
                  </Text>
                </>
              )}
            </Stack>
          </Box>
        )}

        <Box as="nav" padding={5} height="100%" overflowY="scroll">
          <Stack as="ul" spacing={2} listStyleType="none">
            {isSettingsPage
              ? settingsLinks.map((link) => (
                  <SidebarLink key={link.text} link={link} />
                ))
              : links.map((link) => (
                  <SidebarLink key={link.text} link={link} />
                ))}
          </Stack>
        </Box>
        <Box padding={5}>
          <Button
            width="100%"
            onClick={handleLogout}
            ghost
            backgroundColor="secondary.05"
            leftIcon={<AiOutlinePoweroff />}
          >
            Logout
          </Button>
        </Box>
      </Flex>
    </Flex>
  );
};

export default Sidebar;
