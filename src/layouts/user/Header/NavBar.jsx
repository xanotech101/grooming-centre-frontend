import { Flex } from "@chakra-ui/layout";
import { Link, Text } from "../../../components";

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
];

const NavBar = ({ ...rest }) => {
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
      </Flex>
    </Flex>
  );
};

export default NavBar;
