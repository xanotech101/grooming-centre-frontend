import Icon from "@chakra-ui/icon";
import { Box, Flex, HStack } from "@chakra-ui/layout";
import { Tooltip } from "@chakra-ui/tooltip";
import { useEffect, useState } from "react";
import { AiOutlineLeft } from "react-icons/ai";
import { IoVideocam } from "react-icons/io5";
import { VscFiles } from "react-icons/vsc";
import { Button, Heading, Link, Text } from "../../../../components";
import { useTakeCourse } from "../../../../contexts";
import colors from "../../../../theme/colors";
import useSidebar from "./hooks/useSidebar";

const Sidebar = () => {
  const manager = useSidebar();

  const { links, courseTitle, isLoading } = manager;

  const renderContent = (link, props) => (
    <Tooltip label={link.text} aria-label={link.text}>
      <HStack spacing={2} padding={2} {...props}>
        <Icon fontSize="text.level1">
          {link.type !== "video" ? <VscFiles /> : <IoVideocam />}
        </Icon>

        <Text isTruncated>{link.text}</Text>
      </HStack>
    </Tooltip>
  );

  return (
    <Flex
      flexDirection="column"
      as="aside"
      width="270px"
      flexShrink={0}
      width="250px"
      borderRight="1px"
      borderColor="accent.1"
      as="aside"
    >
      <Box as="header">
        <Flex
          justifyContent="space-between"
          borderBottom="1px"
          borderColor="accent.1"
        >
          <Button ghost leftIcon={<AiOutlineLeft />} flex={1}>
            Back
          </Button>
          <Button ghost flex={1}>
            Home
          </Button>
        </Flex>

        <Heading fontSize="h4" paddingY={7} paddingX={2}>
          {courseTitle}
        </Heading>
      </Box>

      <nav>
        <Box as="ul" listStyleType="none" paddingRight={1}>
          {links?.map((link) => (
            <li key={link.id}>
              {link.disabled ? (
                renderContent(link, { opacity: 0.5, cursor: "not-allowed" })
              ) : (
                <Link
                  navLink
                  href={link.to}
                  exact={true}
                  style={{
                    display: "block",
                  }}
                  activeStyle={{
                    background: colors.primary.base,
                    color: colors.white,
                  }}
                >
                  {renderContent(link)}
                </Link>
              )}
            </li>
          ))}
        </Box>
      </nav>
    </Flex>
  );
};

export default Sidebar;
