import { Box, Flex, Stack } from "@chakra-ui/layout";
import { Skeleton } from "@chakra-ui/skeleton";
import { Link, Text } from "../../../components";
import { useApp } from "../../../contexts";
import links from "./links";
import SidebarLink from "./SidebarLink";

const Sidebar = () => {
  const { state, getOneMetadata } = useApp();

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
            <Skeleton rounded="full" boxSize="100px" />

            {state.user && (
              <>
                <Link href={`/admin/users/${state.user.id}/profile`}>
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

        <Box as="nav" padding={5} height="100%" overflowY="scroll">
          <Stack as="ul" spacing={2} listStyleType="none">
            {links.map((link) => (
              <SidebarLink key={link.text} link={link} />
            ))}
          </Stack>
        </Box>
      </Flex>
    </Flex>
  );
};

export default Sidebar;
