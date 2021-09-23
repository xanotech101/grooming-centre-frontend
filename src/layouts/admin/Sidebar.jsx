import Icon from "@chakra-ui/icon";
import { Box, Flex, Stack } from "@chakra-ui/layout";
import { Skeleton } from "@chakra-ui/skeleton";
import { FiSettings } from "react-icons/fi";
import { GiBookshelf } from "react-icons/gi";
import { HiUsers } from "react-icons/hi";
import { RiDashboardLine } from "react-icons/ri";
import { NavLink } from "react-router-dom";
import { Text } from "../../components";
import colors from "../../theme/colors";

const links = [
  {
    to: "/admin/",
    text: "Dashboard",
    exact: true,
    icon: <RiDashboardLine />,
  },
  {
    // to: "/admin/users",
    to: "/admin/users/create",
    text: "Users",
    icon: <HiUsers />,
  },
  {
    to: "/admin/courses",
    text: "Courses",
    icon: <GiBookshelf />,
  },
  {
    to: "/admin/manage/users",
    text: "Manage",
    icon: <FiSettings />,
    links: [
      {
        to: "/admin/manage/users",
        text: "Manage Users",
      },
      {
        to: "/admin/manage/add-course",
        text: "Add New Course",
      },
      {
        to: "/admin/manage/add-lesson",
        text: "Add New Lesson",
      },
      {
        to: "/admin/manage/add-assessment",
        text: "Add New Assessment",
      },
      {
        to: "/admin/manage/library",
        text: "Manage Library",
      },
      {
        to: "/admin/manage/events",
        text: "Manage Events",
      },
      {
        to: "/admin/manage/create-quiz",
        text: "Create Quiz",
      },
      {
        to: "/admin/manage/create-polls",
        text: "Create Polls",
      },
      {
        to: "/admin/manage/add-examination",
        text: "Add Examination",
      },
    ],
  },
];

const Sidebar = () => {
  return (
    <Flex
      flexDirection="column"
      as="aside"
      width="270px"
      flexShrink={0}
      paddingRight={1}
    >
      <Box flex={1} backgroundColor="white" shadow="lg" padding={5}>
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
          <Text fontSize="heading.h3">Roman Kutepov</Text>
          <Text color="gray.500">Admin</Text>
        </Stack>

        <nav>
          <Stack as="ul" spacing={2} listStyleType="none">
            {links.map((link) => (
              <li key={link.text}>
                <NavLink
                  to={link.to}
                  exact={link.exact}
                  style={{
                    display: "block",
                    borderRadius: "4px",
                    color: colors.accent[3],
                  }}
                  activeStyle={{
                    backgroundColor: colors.primary.base,
                    color: "white",
                  }}
                >
                  <Flex alignItems="center" paddingY={3} paddingX={3}>
                    <Icon fontSize="heading.h3" marginRight={3}>
                      {link.icon}
                    </Icon>

                    {link.text}
                  </Flex>
                </NavLink>
              </li>
            ))}
          </Stack>
        </nav>
      </Box>
    </Flex>
  );
};

export default Sidebar;
