import { Grid } from "@chakra-ui/layout";
import { CourseBoxCard } from "../../../components";
import { courses } from "../../../pages/user/Courses/fakeCourses";

export const CoursesRowLayout = () => {
  return (
    <Grid
      className="courses-row-layout"
      templateColumns={{
        base: "repeat(10, 250px)",
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
