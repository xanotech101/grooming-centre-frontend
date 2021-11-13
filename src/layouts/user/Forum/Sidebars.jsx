import { Box, Flex, List, ListItem, ListIcon } from "@chakra-ui/react";
import {
  AiOutlineComment,
  AiOutlineLink,
  AiOutlineQuestionCircle,
  AiOutlineStar,
  AiOutlineUnorderedList,
} from "react-icons/ai";
import { BsDot, BsTag } from "react-icons/bs";
import { Heading, Link, SearchBar, Text } from "../../../components";
import { AskAQuestionButton } from "./Header/Header";
import useDisplayHeader from "./Header/hooks/useDisplayHeader";

const menuLinks = [
  {
    href: "/forum/questions?tab=new",
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
      <SearchBar marginBottom={5} border="none" />

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
  const { pageDoNotRequireHeader, isAddQuestionPage } = useDisplayHeader();

  return (
    <Box as="aside" {...rest}>
      {pageDoNotRequireHeader() && !isAddQuestionPage && (
        <Box marginBottom={8} textAlign="right">
          <AskAQuestionButton />
        </Box>
      )}
    </Box>
  );
};
