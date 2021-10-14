import { Box, Flex, HStack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Button } from "../../../components";
import useQueryParams from "../../../hooks/useQueryParams";
import { AiOutlineFire } from "react-icons/ai";
import { BsArrowUpLeft, BsClockHistory } from "react-icons/bs";
import { GoIssueClosed } from "react-icons/go";

const links = [
  {
    text: "New",
    tab: "new",
    icon: <BsClockHistory />,
  },
  {
    text: "Top",
    tab: "top",
    icon: <BsArrowUpLeft />,
  },
  {
    text: "Hot",
    tab: "hot",
    icon: <AiOutlineFire />,
  },
  {
    text: "Closed",
    tab: "closed",
    icon: <GoIssueClosed />,
  },
];

const useTab = () => {
  const [currentTab, setCurrentTab] = useState("");

  const tabQuery = useQueryParams().get("tab");

  // Initial currentTab
  useEffect(() => {
    setCurrentTab(tabQuery);
  }, [tabQuery]);

  return {
    currentTab,
  };
};

const Header = ({ ...rest }) => {
  const { currentTab } = useTab();

  const getStyles = (tab) =>
    !(tab === currentTab) ? { ordinary: true } : { blue: true };

  return (
    <Flex {...rest}>
      <HStack alignSelf="flex-start" spacing={1} flex={1}>
        {links.map((link) => (
          <Button
            key={link.tab}
            sm
            link={`?tab=${link.tab}`}
            {...getStyles(link.tab)}
            paddingX={3}
          >
            {link.icon} <Box paddingRight={1}></Box> {link.text}
          </Button>
        ))}
      </HStack>

      <Button>Ask a question</Button>
    </Flex>
  );
};

export default Header;
