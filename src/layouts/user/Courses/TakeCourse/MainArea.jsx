import { Box, Flex } from "@chakra-ui/layout";
import { Switch } from "react-router-dom";
import { Button } from "../../../../components";
import {
  AssessmentDetailsPageRoute,
  LessonDetailsPageRoute,
} from "../../../../pages/user";

const MainArea = () => {
  return (
    <Flex flexDirection="column" flex={1} height="100vh">
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
            Complete And Continue
          </Button>
        </Flex>
      </Box>

      <Box as="main" paddingTop={10} paddingBottom={16} paddingX={6} flex={1} overflowY="auto">
        <Switch>
          <LessonDetailsPageRoute path="/courses/take/:course_id/lessons/:lesson_id" />
          <AssessmentDetailsPageRoute path="/courses/take/:course_id/assessment" />
        </Switch>
      </Box>
    </Flex>
  );
};

export default MainArea;
