import { Box } from "@chakra-ui/react";
import { Skeleton } from "@chakra-ui/skeleton";
import ReactPlayer from 'react-player/lazy'
import { Route } from "react-router-dom";
import { Heading, SkeletonText } from "../../../../components";
import useLessonDetails from "./hooks/useLessonDetails";

const LessonDetailsPage = () => {
  const manager = useLessonDetails();
  const { lesson, isLoading } = manager;

  return (
    <Box>
      <Box as="header" marginBottom={10}>
        {isLoading ? (
          <SkeletonText />
        ) : (
          <Heading as="h1" fontSize="heading.h3">
            {lesson?.title}
          </Heading>
        )}
      </Box>


      <Box height="calc((100vw - 250px - 48px) / 2)" marginBottom={10}>

{
  isLoading ? <Skeleton  width='100%'
              height='100%' /> : 
        <ReactPlayer url='https://www.youtube.com/watch?v=ysz5S6PUM-U' width='100%'
              height='100%'  />
}

      </Box>


<Box>
{isLoading ? 
<SkeletonText numberOfLines={10} />

: lesson?.content}

</Box>
    </Box>
  );
};

export const LessonDetailsPageRoute = ({ ...rest }) => {
  return (
    <Route {...rest} render={(props) => <LessonDetailsPage {...props} />} />
  );
};
