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

const menuLinks = [
  {
    href: "/forum/questions?tab=new",
    text: "Questions",
    icon: <AiOutlineUnorderedList />,
  },
  {
    href: "/forum/tags?tab=new",
    text: "Tags",
    icon: <BsTag />,
  },
  {
    href: "/forum/mentions?tab=new",
    text: "Mentions",
    icon: <BsTag />,
  },
];
const personalNavLinks = [
  {
    href: "/forum/your-questions?tab=new",
    text: "Your questions",
    icon: <AiOutlineQuestionCircle />,
  },
  {
    href: "/forum/your-answers?tab=new",
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
      paddingX={5}
      paddingY={7}
      {...rest}
    >
      <Box marginBottom={8}>
        <Flex
          alignItems="center"
          borderBottom="1px"
          borderColor="accent.1"
          color="accent.3"
          paddingBottom={2}
          marginBottom={3}
        >
          <AiOutlineStar />

          <Heading fontSize="text.level3" marginLeft={2} color="black">
            Must-read posts
          </Heading>
        </Flex>

        <List color="others.4" spacing={1}>
          <ListItem display="flex">
            <ListIcon marginTop={1} fontSize="xl">
              <BsDot />
            </ListIcon>

            <Link href="#">
              <Text _hover={{ textDecoration: "underline" }}>
                Please read rules before you start working on a platform
              </Text>
            </Link>
          </ListItem>

          <ListItem display="flex">
            <ListIcon marginTop={1} fontSize="xl">
              <BsDot />
            </ListIcon>

            <Link href="#">
              <Text _hover={{ textDecoration: "underline" }}>
                Vision & Strategy of Alemhelp
              </Text>
            </Link>
          </ListItem>
        </List>
      </Box>

      <Box>
        <Flex
          alignItems="center"
          borderBottom="1px"
          borderColor="accent.1"
          color="accent.3"
          paddingBottom={2}
          marginBottom={3}
        >
          <AiOutlineLink />

          <Heading fontSize="text.level3" marginLeft={2} color="black">
            Featured links
          </Heading>
        </Flex>

        <List color="others.4" spacing={1}>
          <ListItem display="flex">
            <ListIcon marginTop={1} fontSize="xl">
              <BsDot />
            </ListIcon>

            <Link href="#">
              <Text _hover={{ textDecoration: "underline" }}>
                Alemhelp source-code on GitHub{" "}
              </Text>
            </Link>
          </ListItem>

          <ListItem display="flex">
            <ListIcon marginTop={1} fontSize="xl">
              <BsDot />
            </ListIcon>

            <Link href="#">
              <Text _hover={{ textDecoration: "underline" }}>
                Golang best-practices
              </Text>
            </Link>
          </ListItem>

          <ListItem display="flex">
            <ListIcon marginTop={1} fontSize="xl">
              <BsDot />
            </ListIcon>

            <Link href="#">
              <Text _hover={{ textDecoration: "underline" }}>
                Alem.School dashboard
              </Text>
            </Link>
          </ListItem>
        </List>
      </Box>
    </Box>
  );
};
