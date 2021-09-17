import Icon from "@chakra-ui/icon";
import { Box, Flex, HStack, Stack } from "@chakra-ui/layout";
import { Skeleton } from "@chakra-ui/skeleton";
import { Tooltip } from "@chakra-ui/tooltip";
import { useEffect, useState } from "react";
import { AiOutlineLeft } from "react-icons/ai";
import { IoVideocam } from "react-icons/io5";
import { VscFiles } from "react-icons/vsc";
import {
  Button,
  Heading,
  Link,
  SkeletonText,
  Text,
} from "../../../../components";
import { useTakeCourse } from "../../../../contexts";
import { useGoBack } from "../../../../hooks";
import colors from "../../../../theme/colors";
import useSidebar from "./hooks/useSidebar";

const Sidebar = () => {
  const handleGoBack = useGoBack();
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
          <Button
            ghost
            leftIcon={<AiOutlineLeft />}
            flex={1}
            onClick={handleGoBack}
          >
            Back
          </Button>
          <Button ghost flex={1}>
            Home
          </Button>
        </Flex>

        <Box paddingY={7} paddingX={2}>
          {isLoading ? (
            <SkeletonText />
          ) : (
            <Heading fontSize="h4">{courseTitle}</Heading>
          )}
        </Box>
      </Box>

      <nav>
        <Box as="ul" listStyleType="none" paddingRight={1}>
          {isLoading ? (
            <SkeletonText numberOfLines={10} height="37px" spacing={1} />
          ) : (
            links?.map((link) => (
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
            ))
          )}
        </Box>
      </nav>
    </Flex>
  );
};

export default Sidebar;
