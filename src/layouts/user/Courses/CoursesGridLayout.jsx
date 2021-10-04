import { Grid } from "@chakra-ui/layout";
import { CourseBoxCard } from "../../../components";
import { courses } from "../../../pages/user/Courses/fakeCourses";

export const CoursesGridLayout = () => {
  return (
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
      {courses.map((course, index) => (
        <CourseBoxCard key={index} {...course} />
      ))}
    </Grid>
  );
};
