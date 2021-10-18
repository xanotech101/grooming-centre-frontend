import { Box, Flex, HStack } from "@chakra-ui/react";
import { Button } from "../../../../components";
import { AiOutlineFire } from "react-icons/ai";
import { BsArrowUpLeft, BsClockHistory } from "react-icons/bs";
import { GoIssueClosed } from "react-icons/go";
import useDisplayHeader from "./hooks/useDisplayHeader";
import useTab from "./hooks/useTab";

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

const Header = ({ ...rest }) => {
  const { pageDoNotRequireHeader } = useDisplayHeader();

  const { currentTab } = useTab();
  const getStyles = (tab) =>
    !(tab === currentTab) ? { ordinary: true } : { blue: true };

  return (
    !pageDoNotRequireHeader() && (
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

        <AddQuestionButton />
      </Flex>
    )
  );
};

export const AddQuestionButton = () => (
  <Button link="/forum/your-questions/add">Ask a question</Button>
);

export default Header;
