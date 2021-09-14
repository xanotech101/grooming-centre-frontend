import { Grid } from "@chakra-ui/layout";
import { CourseBoxCard } from "../../../components";
import { courses } from "../../../pages/user/Courses/fakeCourses";

export const CoursesRowLayout = () => {
  return (
    <Grid
      className="courses-row-layout"
      templateColumns={{
        base: "repeat(10, 250px)",
        // base: "repeat(1, 1fr)",
        // "mobile-m": "repeat(2, 250px)",
        // "mobile-l": "repeat(2, 1fr)",
        // tablet: "repeat(3, 1fr)",
        // laptop: "repeat(4, 1fr)",
        // "laptop-l": "repeat(5, 1fr)",
        // "4k": "repeat(6, 1fr)",
      }}
      overflowX="scroll"
      overflowY="hidden"
      gap={{ base: 3, laptop: 6 }}
      padding={1}
    >
      {courses.slice(0, 10).map((course, index) => (
        <CourseBoxCard key={index} {...course} />
      ))}
    </Grid>
  );
};
