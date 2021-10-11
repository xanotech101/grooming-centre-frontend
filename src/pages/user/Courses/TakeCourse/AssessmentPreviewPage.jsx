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
import { Button, Heading, SkeletonText, Text } from "../../../../components";
import { useTakeCourse } from "../../../../contexts";
import { getDuration } from "../../../../utils";
import useQueryParams from "../../../../hooks/useQueryParams";
import { capitalizeFirstLetter } from "../../../../utils/formatString";
import useAssessmentPreview from "./hooks/useAssessmentPreview";

const AssessmentPreviewPage = ({ sidebarLinks }) => {
  const { assessment, isLoading, error } = useAssessmentPreview(sidebarLinks);
  useTakeCourse();

  const isExamination = useQueryParams().get("examination");
  const duration = getDuration(assessment.duration);

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
          <List spacing={3}>
            <ListItem d="flex" alignItems="center">
              <ListIcon fontSize="text.level1" color="accent.2">
                <BsClockFill />
              </ListIcon>

              <Text>{assessment.questionCount} multiple choice questions</Text>
            </ListItem>
            <ListItem d="flex" alignItems="center">
              <ListIcon fontSize="text.level1" color="accent.2">
                <BsClockFill />
              </ListIcon>

              <Text>
                {duration.hours ? `${duration.hours} hours ` : null}
                {duration.minutes ? `${duration.minutes} minutes.` : null}
              </Text>
            </ListItem>
            <ListItem d="flex" alignItems="center">
              <ListIcon fontSize="text.level1" color="accent.2">
                <BsClockFill />
              </ListIcon>

              <Text>
                Score a minimum of{" "}
                {assessment.minimumPercentageScoreToEarnABadge}% to earn a badge
              </Text>
            </ListItem>
          </List>
        )}
      </Box>

      <UnorderedList spacing={2} paddingBottom={10}>
        <ListItem>
          <Text>
            You must complete this assessment in one session — make sure your
            internet is reliable.
          </Text>
        </ListItem>
        <ListItem>
          <Text>
            You can only take this assessment once, so do well to put in your
            best.
          </Text>
        </ListItem>
        <ListItem>
          <Text>
            We won’t show your results to anyone without your permission.
          </Text>
        </ListItem>
      </UnorderedList>

      {console.log(isExamination ? "?examination=true" : null)}

      {isExamination ? (
        <Button
          link={`/courses/take/${assessment.courseId}/assessment/start/${assessment.id}?examination=true`}
          disabled={isLoading && error}
        >
          Take Examination
        </Button>
      ) : (
        <Button
          link={`/courses/take/${assessment.courseId}/assessment/start/${assessment.id}`}
          disabled={isLoading && error}
        >
          Take Assessment
        </Button>
      )}
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
