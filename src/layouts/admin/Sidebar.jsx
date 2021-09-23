import Icon from "@chakra-ui/icon";
import { Box, Flex, Stack } from "@chakra-ui/layout";
import { Skeleton } from "@chakra-ui/skeleton";
import { useCallback, useEffect, useState } from "react";
import { BiChevronDown } from "react-icons/bi";
import { FiSettings } from "react-icons/fi";
import { GiBookshelf } from "react-icons/gi";
import { HiUsers } from "react-icons/hi";
import { RiDashboardLine } from "react-icons/ri";
import { useParams } from "react-router-dom";
import { useRouteMatch } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { Link, Text } from "../../components";
import colors from "../../theme/colors";

const links = [
  {
    href: "/admin/",
    text: "dashboard",
    exact: true,
    icon: <RiDashboardLine />,
  },
  {
    href: "/admin/users",
    text: "users",
    icon: <HiUsers />,
  },
  {
    href: "/admin/courses",
    text: "courses",
    icon: <GiBookshelf />,
  },
  {
    // href: "/admin/manage",
    // onClick: (replace) => {
    //   // Redirects to `/admin/manage/users` immediately the <a> tag goes to `/admin/manage`
    //   setTimeout(() => {
    //     replace("/admin/manage/users");
    //   }, 0);
    // },
    text: "manage",
    matcher: "/admin/manage",
    icon: <FiSettings />,
    links: [
      {
        href: "/admin/manage/users",
        text: "Manage Users",
      },
      {
        href: "/admin/manage/add-course",
        text: "Add New Course",
      },
      {
        href: "/admin/manage/add-lesson",
        text: "Add New Lesson",
      },
      {
        href: "/admin/manage/add-assessment",
        text: "Add New Assessment",
      },
      {
        href: "/admin/manage/library",
        text: "Manage Library",
      },
      {
        href: "/admin/manage/events",
        text: "Manage Events",
      },
      {
        href: "/admin/manage/create-quiz",
        text: "Create Quiz",
      },
      {
        href: "/admin/manage/create-polls",
        text: "Create Polls",
      },
      {
        href: "/admin/manage/add-examination",
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
            <Text fontSize="heading.h3">Roman Kutepov</Text>
            <Text color="gray.500">Admin</Text>
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

const useAccordion = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [isActive, setIsActive] = useState(false);

  const handleToggle = () => {
    setIsOpen((prev) => !prev);
  };

  return {
    isOpen,
    isActive,
    setIsActive,
    handleToggle,
  };
};

const SidebarLink = ({ link }) => {
  const accordionManager = useAccordion();

  const handleTopLevelLinkClick = () => {
    if (link.links) {
      accordionManager.handleToggle();
    }
  };

  useEffect(() => {
    if (window.location.pathname.includes(link.matcher)) {
      accordionManager.setIsActive(true);
    } else {
      accordionManager.setIsActive(false);
    }
  }, [window.location.pathname, link.href]);

  const renderTopLevelContent = (props) => (
    <Flex
      alignItems="center"
      paddingY={3}
      paddingX={3}
      onClick={handleTopLevelLinkClick}
      textTransform="capitalize"
      _hover={{ cursor: "pointer" }}
      {...props}
      {...(accordionManager.isActive
        ? {
            backgroundColor: colors.primary.base,
            color: "white",
            borderRadius: "4px",
          }
        : {})}
    >
      <Icon fontSize="heading.h3" marginRight={3}>
        {link.icon}
      </Icon>
      <Text flex={1}>{link.text}</Text>

      {link.links && (
        <Icon
          fontSize="heading.h3"
          transition=".15s"
          transform={`rotate(${accordionManager.isOpen ? 0 : 180}deg)`}
        >
          <BiChevronDown />
        </Icon>
      )}
    </Flex>
  );

  return (
    <li>
      {link.href ? (
        <Link
          navLink
          href={link.href}
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
          {renderTopLevelContent()}
        </Link>
      ) : (
        renderTopLevelContent()
      )}

      {link.links && (
        <Box
          as="ul"
          listStyleType="none"
          overflow="hidden"
          transition="max-height .5s linear"
          maxHeight={
            accordionManager.isOpen ? `${37 * link.links.length}px` : 0
          }
        >
          {link.links.map((link) => (
            <li key={link.text}>
              <Link
                navLink
                href={link.href}
                activeStyle={{
                  color: colors.primary.base,
                  fontWeight: "bold",
                  backgroundColor: colors.secondary["05"],
                  borderRadius: "1rem",
                }}
                style={{
                  display: "block",
                  color: colors.accent[2],
                }}
              >
                <Text
                  padding={1}
                  marginY={2}
                  paddingX={5}
                  _hover={{ color: "accent.3" }}
                >
                  {link.text}
                </Text>
              </Link>
            </li>
          ))}
        </Box>
      )}
    </li>
  );
};

export default Sidebar;
