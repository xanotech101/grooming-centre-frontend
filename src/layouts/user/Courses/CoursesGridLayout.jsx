import { Grid } from "@chakra-ui/layout";
import { CourseBoxCard, Button } from "../../../components";
import { EmptyState } from "../../../layouts";

export const CoursesGridLayout = ({ courses }) => {
  const coursesIsEmpty =
    !courses.loading && !courses.err && courses.data && !courses.data?.length;

  return (
    <>
      {coursesIsEmpty && (
        <EmptyState
          width="100"
          cta={<Button link="/dashboard">Return to dashboard</Button>}
          heading="No Courses Yet"
          description="Your department have no assigned courses just yet"
        />
      )}

      <Grid
        className="courses-grid-layout"
        templateColumns={{
          base: "repeat(1, 1fr)",
          "mobile-m": "repeat(2, 250px)",
          "mobile-l": "repeat(2, 1fr)",
          tablet: "repeat(3, 1fr)",
          laptop: "repeat(4, 1fr)",
          // "laptop-l": "repeat(5, 1fr)",
          "4k": "repeat(6, 1fr)",
        }}
        overflowX={{
          base: "hidden",
          "mobile-m": "scroll",
          "mobile-l": "hidden",
        }}
        overflowY="hidden"
        columnGap={{ base: "40px", laptop: "60px" }}
        rowGap={{ base: "40px", laptop: "50px" }}
        padding={1}
      >
        {courses.err}

        {courses.loading &&
          Array(8)
            .fill("")
            .map((_, index) => <CourseBoxCard key={index} isLoading />)}

        {courses.data?.map((course, index) => (
          <CourseBoxCard key={index} {...course} isLoading={course.loading} />
        ))}
      </Grid>
    </>
  );
};
