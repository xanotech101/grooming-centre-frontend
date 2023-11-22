import { Flex } from "@chakra-ui/layout";
import { Link, Text } from "../../../components";
import { useApp } from "../../../contexts";

const links = [
  {
    href: "/dashboard",
    text: "Dashboard",
  },
  {
    href: "/courses",
    text: "Courses",
  },
  {
    href: "/library/books",
    text: "Library",
  },
  {
    href: "/forum",
    text: "Forum",
  },
  {
    href: "/events",
    text: "Events",
  },
  {
    href: "/polls",
    text: "Polls",
  },
  {
    href: "/courses/grade-overview",
    text: "Grades",
  },
  {
    href: "/standalone-exams",
    text: "Exams",
  },
];

const NavBar = ({ ...rest }) => {
  const { handleLogout } = useApp();
  return (
    <Flex as="nav" alignSelf="stretch" {...rest}>
      <Flex listStyleType="none" as="ul">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              className="user-header-nav-link"
              activeClassName="user-header-nav-link--active"
              navLink
              href={link.href}
            >
              <Text as="level3">{link.text}</Text>
            </Link>
          </li>
        ))}
        <Text
          as="level3"
          color="red"
          cursor="pointer"
          ml={4}
          onClick={handleLogout}
          alignSelf="center"
          font="bold"
        >
          Logout
        </Text>
      </Flex>
    </Flex>
  );
};

export default NavBar;
