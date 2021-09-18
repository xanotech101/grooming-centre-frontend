import { Box, UnorderedList, ListItem, List, ListIcon } from "@chakra-ui/react";
import { BsClockFill } from "react-icons/bs";
import { Route } from "react-router-dom";
import { Button, Heading } from "../../../../components";

const data = {
  topics: "Introduction to HTML",
  questionCount: 20,
};

const AssessmentPreviewPage = () => {
  return (
    <Box paddingTop={10} as="main" paddingX={6}>
      <Heading as="h1" fontSize="heading.h3" marginBottom={5}>
        Assessment
      </Heading>

      <Heading fontSize="heading.h4">Topics: {data.topics}</Heading>

      <Box
        borderBottom="1px"
        borderColor="accent.2"
        marginY={10}
        paddingBottom={10}
      >
        <List spacing={2}>
          <ListItem>
            <ListIcon fontSize="text.level1" color="accent.2">
              <BsClockFill />
            </ListIcon>
            {data.questionCount} multiple coice questions
          </ListItem>
          <ListItem>
            <ListIcon fontSize="text.level1" color="accent.2">
              <BsClockFill />
            </ListIcon>
            60 seconds per question
          </ListItem>
          <ListItem>
            <ListIcon fontSize="text.level1" color="accent.2">
              <BsClockFill />
            </ListIcon>
            Score a minimum of 90% to earn a badge
          </ListItem>
        </List>
      </Box>

      <UnorderedList spacing={2} paddingBottom={10}>
        <ListItem>
          You must complete this assessment in one session — make sure your
          internet is reliable.
        </ListItem>
        <ListItem>
          You can retake this assessment once if you don’t earn a badge.
        </ListItem>
        <ListItem>
          We won’t show your results to anyone without your permission.
        </ListItem>
      </UnorderedList>

      <Button>Take Assessment</Button>
    </Box>
  );
};

export const AssessmentPreviewPageRoute = ({ ...rest }) => {
  return (
    <Route {...rest} render={(props) => <AssessmentPreviewPage {...props} />} />
  );
};
