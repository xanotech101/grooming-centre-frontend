import { Flex } from "@chakra-ui/layout";
import { Link, Text } from "../../../components";

const links = [
  {
    href: "/courses",
    text: "All courses",
  },
  {
    href: "/courses/new",
    text: "New Courses",
  },
  {
    href: "/courses/completed",
    text: "Completed",
  },
  {
    href: "/courses/in-progress",
    text: "In Progress",
  },
];

const NavBar = () => {
  return (
    <Flex as="nav">
      <Flex listStyleType="none" as="ul">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              className="user-courses-nav-link"
              activeClassName="user-courses-nav-link--active"
              navLink
              exact
              href={link.href}
            >
              <Text as="level2">{link.text}</Text>
            </Link>
          </li>
        ))}
      </Flex>
    </Flex>
  );
};

export default NavBar;
