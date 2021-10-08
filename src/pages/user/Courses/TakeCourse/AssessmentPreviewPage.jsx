import {
  Box,
  Grid,
  UnorderedList,
  ListItem,
  List,
  ListIcon,
} from "@chakra-ui/react";
import { BsClockFill } from "react-icons/bs";
import { Route } from "react-router-dom";
import { Button, Heading, SkeletonText } from "../../../../components";
import { capitalizeFirstLetter } from "../../../../utils/formatString";
import useAssessmentPreview from "./hooks/useAssessmentPreview";

const AssessmentPreviewPage = ({ sidebarLinks }) => {
  const { assessment, isLoading, error } = useAssessmentPreview(sidebarLinks);

  return error ? (
    <Grid placeItems="center" height="100vh" width="100%">
      <Heading as="h3">{capitalizeFirstLetter(error)}</Heading>
    </Grid>
  ) : (
    <Box paddingTop={10} as="main" paddingX={6}>
      <Heading as="h1" fontSize="heading.h3" marginBottom={5}>
        {assessment.text}
      </Heading>

      {!isLoading && (
        <Heading fontSize="heading.h4">Topics: {assessment.topic}</Heading>
      )}

      <Box
        borderBottom="1px"
        borderColor="accent.2"
        marginY={10}
        paddingBottom={10}
      >
        {isLoading ? (
          <SkeletonText numberOfLines={4} spacing={5} />
        ) : (
          <List spacing={2}>
            <ListItem>
              <ListIcon fontSize="text.level1" color="accent.2">
                <BsClockFill />
              </ListIcon>
              {assessment.questionCount} multiple choice questions
            </ListItem>
            <ListItem>
              <ListIcon fontSize="text.level1" color="accent.2">
                <BsClockFill />
              </ListIcon>
              {assessment.duration}
            </ListItem>
            <ListItem>
              <ListIcon fontSize="text.level1" color="accent.2">
                <BsClockFill />
              </ListIcon>
              Score a minimum of {assessment.minimumPercentageScoreToEarnABadge}
              % to earn a badge
            </ListItem>
          </List>
        )}
      </Box>

      <UnorderedList spacing={2} paddingBottom={10}>
        <ListItem>
          You must complete this assessment in one session — make sure your
          internet is reliable.
        </ListItem>
        <ListItem>
          You can only take this assessment once, so do well to put in your
          best.
        </ListItem>
        <ListItem>
          We won’t show your results to anyone without your permission.
        </ListItem>
      </UnorderedList>

      <Button
        link={`/courses/take/${assessment.courseId}/assessment/start/${assessment.id}`}
        disabled={isLoading && error}
      >
        Take Assessment
      </Button>
    </Box>
  );
};

export const AssessmentPreviewPageRoute = ({ sidebarLinks, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) => (
        <AssessmentPreviewPage sidebarLinks={sidebarLinks} {...props} />
      )}
    />
  );
};
