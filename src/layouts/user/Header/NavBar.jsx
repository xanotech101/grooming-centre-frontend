import { Flex } from "@chakra-ui/layout";
import { Link } from "../../../components";

const links = [
  {
    href: "/dashboard",
    children: "Dashboard",
  },
  {
    href: "/courses",
    children: "Courses",
  },
  {
    href: "/library",
    children: "Library",
  },
  {
    href: "/forum",
    children: "Forum",
  },
  {
    href: "/events",
    children: "Events",
  },
];

const NavBar = () => {
  return (
    <Flex as="nav" alignSelf="stretch">
      <Flex listStyleType="none" as="ul">
        {links.map((link) => (
          <li>
            <Link
              className="user-header-nav-link"
              activeClassName="user-header-nav-link--active"
              navLink
              {...link}
            />
          </li>
        ))}
      </Flex>
    </Flex>
  );
};

export default NavBar;
