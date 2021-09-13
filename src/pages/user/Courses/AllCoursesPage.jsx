import { Box, Grid } from "@chakra-ui/react";
import { Route } from "react-router-dom";
import { CourseBoxCard } from "../../../components";

const courses = [
  {
    progress: 40,
    coverImage: null,
    title: "Web Design",
    lessonCount: 24,
    duration: 610,
    instructor: {
      image: null,
      name: "John Doe",
      role: "Senior Facility Manager",
    },
  },
  {
    progress: 90,
    coverImage: null,
    title: "Web Development & Development Crash Course 2021",
    lessonCount: 24,
    duration: 610,
    instructor: {
      image: null,
      name: "John Doe",
      role: "Senior Facility Manager",
    },
  },
  {
    progress: 40,
    coverImage: null,
    title: "Web Development & Development Crash Course 2021",
    lessonCount: 24,
    duration: 610,
    instructor: {
      image: null,
      name: "John Doe",
      role: "Senior Facility Manager",
    },
  },
  {
    progress: 40,
    coverImage: null,
    title: "Web Development & Development Crash Course 2021",
    lessonCount: 24,
    duration: 610,
    instructor: {
      image: null,
      name: "John Doe",
      role: "Senior Facility Manager",
    },
  },
  {
    progress: 100,
    coverImage: null,
    title: "Web Development & Development Crash Course 2021",
    lessonCount: 24,
    duration: 610,
    instructor: {
      image: null,
      name: "John Doe",
      role: "Senior Facility Manager",
    },
  },

  {
    progress: 40,
    disabled: true,
    coverImage: null,
    title: "Web Development & Development Crash Course 2021",
    lessonCount: 24,
    duration: 610,
    instructor: {
      image: null,
      name: "John Doe",
      role: "Senior Facility Manager",
    },
  },
  {
    progress: 40,
    disabled: true,
    coverImage: null,
    title: "Web Development & Development Crash Course 2021",
    lessonCount: 24,
    duration: 610,
    instructor: {
      image: null,
      name: "John Doe",
      role: "Senior Facility Manager",
    },
  },
  {
    progress: 40,
    disabled: true,
    coverImage: null,
    title: "Web Development & Development Crash Course 2021",
    lessonCount: 24,
    duration: 610,
    instructor: {
      image: null,
      name: "John Doe",
      role: "Senior Facility Manager",
    },
  },
  {
    progress: 40,
    disabled: true,
    coverImage: null,
    title: "Web Development & Development Crash Course 2021",
    lessonCount: 24,
    duration: 610,
    instructor: {
      image: null,
      name: "John Doe",
      role: "Senior Facility Manager",
    },
  },
  {
    progress: 40,
    disabled: true,
    coverImage: null,
    title: "Web Development & Development Crash Course 2021",
    lessonCount: 24,
    duration: 610,
    instructor: {
      image: null,
      name: "John Doe",
      role: "Senior Facility Manager",
    },
  },
];

const AllCoursesPage = () => {
  return (
    <Grid
      templateColumns={{
        base: "repeat(1, 1fr)",
        "mobile-m": "repeat(2, 250px)",
        "mobile-l": "repeat(2, 1fr)",
        tablet: "repeat(3, 1fr)",
        laptop: "repeat(4, 1fr)",
        "laptop-l": "repeat(5, 1fr)",
        "4k": "repeat(6, 1fr)",
      }}
      overflowX={{
        base: "hidden",
        "mobile-m": "scroll",
        "mobile-l": "hidden",
      }}
      overflowY="hidden"
      gap={{ base: 2, laptop: 5 }}
    >
      {courses.map((course, index) => (
        <CourseBoxCard key={index} {...course} />
      ))}
    </Grid>
  );
};

const AllCoursesPageRoute = ({ ...rest }) => {
  return <Route {...rest} render={(props) => <AllCoursesPage {...props} />} />;
};

export default AllCoursesPageRoute;
