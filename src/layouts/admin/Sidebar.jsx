import { Box, Heading, Stack, Text } from "@chakra-ui/layout";
import { Skeleton } from "@chakra-ui/skeleton";
import React from "react";
import { NavLink } from "react-router-dom";
import { colors } from "../../theme/colors";

const links = [
  {
    to: "/admin/",
    children: "Dashboard",
    exact: true,
  },
  {
    to: "/admin/users",
    children: "Users",
  },
  {
    to: "/admin/courses",
    children: "Courses",
  },
  {
    to: "/admin/roles",
    children: "Roles",
  },
  {
    to: "/admin/settings",
    children: "Settings",
  },
];

const Sidebar = () => {
  return (
    <Box
      as="aside"
      width="270px"
      backgroundColor="white"
      flexShrink={0}
      padding={5}
    >
      <Stack
        as="header"
        spacing={2}
        justifyContent="center"
        alignItems="center"
        borderBottom="1px"
        borderColor="gray.200"
        height="200px"
        marginBottom={5}
      >
        <Skeleton rounded="full" boxSize="100px" />
        <Heading size="md" as="h2">
          Roman Kutepov
        </Heading>
        <Text color="gray.500">Admin</Text>
      </Stack>

      <nav>
        <Stack as="ul" spacing={2} listStyleType="none">
          {links.map((linkProps) => (
            <li>
              <NavLink
                {...linkProps}
                style={{
                  display: "grid",
                  placeItems: "center",
                  height: "40px",
                  borderRadius: "5px",
                }}
                activeStyle={{
                  backgroundColor: colors.primary.base,
                  color: "white",
                }}
              />
            </li>
          ))}
        </Stack>
      </nav>
    </Box>
  );
};

export default Sidebar;
