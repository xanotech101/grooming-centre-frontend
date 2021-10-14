import { Box, Flex } from "@chakra-ui/react";
import {
  AiOutlineComment,
  AiOutlineQuestionCircle,
  AiOutlineUnorderedList,
} from "react-icons/ai";
import { BsTag } from "react-icons/bs";
import { Link, SearchBar, Text } from "../../../components";

const menuLinks = [
  {
    href: "/forum/questions",
    text: "Questions",
    icon: <AiOutlineUnorderedList />,
  },
  {
    href: "/forum/tags",
    text: "Tags",
    icon: <BsTag />,
  },
  {
    href: "/forum/mentions",
    text: "Mentions",
    icon: <BsTag />,
  },
];
const personalNavLinks = [
  {
    href: "/forum/your-questions",
    text: "Your questions",
    icon: <AiOutlineQuestionCircle />,
  },
  {
    href: "/forum/your-answers",
    text: "Your answers",
    icon: <AiOutlineComment />,
  },
];

export const Sidebar = ({ ...rest }) => {
  return (
    <Box {...rest}>
      <SearchBar marginBottom={5} />

      <Box as="nav">
        <Flex as="ul" listStyleType="none" flexDirection="column">
          <Text
            textTransform="uppercase"
            marginLeft={6}
            paddingY={2}
            color="accent.3"
          >
            Menu
          </Text>
          {menuLinks.map((link) => (
            <li key={link.href}>
              <Link
                className="user-forum-sidebar-link"
                activeClassName="user-forum-sidebar-link--active"
                navLink
                exact={link.exact}
                href={link.href}
              >
                {link.icon}
                <Text marginLeft={2} fontWeight="bold">
                  {link.text}
                </Text>
              </Link>
            </li>
          ))}

          <Text
            textTransform="uppercase"
            marginLeft={6}
            marginTop={3}
            paddingY={2}
            color="accent.3"
          >
            Personal Navigator
          </Text>
          {personalNavLinks.map((link) => (
            <li key={link.href}>
              <Link
                className="user-forum-sidebar-link"
                activeClassName="user-forum-sidebar-link--active"
                navLink
                exact={link.exact}
                href={link.href}
              >
                {link.icon}
                <Text marginLeft={2} fontWeight="bold">
                  {link.text}
                </Text>
              </Link>
            </li>
          ))}
        </Flex>
      </Box>
    </Box>
  );
};

export const Aside = ({ ...rest }) => {
  return (
    <Box
      as="aside"
      shadow="0px 0px 5px rgba(0, 0, 0, 0.1)"
      rounded={5}
      minHeight="300px"
      padding={3}
      {...rest}
    >
      Aside
    </Box>
  );
};
