import { Box, Flex } from "@chakra-ui/layout";
import { Button } from "../../../../components";

const MainArea = () => {
  return (
    <Box flex={1}>
      <Box as="header">
        <Flex
          justifyContent="space-between"
          borderBottom="1px"
          borderColor="accent.1"
        >
          <Button ghost flex={1}>
            Previous Lesson
          </Button>
          <Button
            ghost
            backgroundColor="primary.base"
            color="white"
            _hover={{ opacity: 0.8 }}
            flex={1}
          >
            Complete and Continue
          </Button>
        </Flex>
      </Box>

      <Box as="main"></Box>
    </Box>
  );
};

export default MainArea;
