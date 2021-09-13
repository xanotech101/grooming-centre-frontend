import { Box, Grid } from "@chakra-ui/react";
import { Route } from "react-router-dom";

const AllCoursesPage = () => {
  return (
    // <Grid templateColumns="repeat(5, minmax(250px, 1fr))" gap={5}>
    <Grid
      templateColumns={{
        base: "repeat(2, 1fr)",
        "mobile-m": "repeat(2, 1fr)",
        "mobile-l": "repeat(2, 1fr)",
        tablet: "repeat(3, 1fr)",
        laptop: "repeat(4, 1fr)",
        "laptop-l": "repeat(5, 1fr)",
        "4k": "repeat(6, 1fr)",
      }}
      gap={{ base: 2, laptop: 5 }}
    >
      <Box border="1px" height="280px"></Box>
      <Box border="1px" height="280px"></Box>
      <Box border="1px" height="280px"></Box>
      <Box border="1px" height="280px"></Box>
      <Box border="1px" height="280px"></Box>

      <Box border="1px" height="280px"></Box>
      <Box border="1px" height="280px"></Box>
      <Box border="1px" height="280px"></Box>
      <Box border="1px" height="280px"></Box>
      <Box border="1px" height="280px"></Box>

      <Box border="1px" height="280px"></Box>
      <Box border="1px" height="280px"></Box>
      <Box border="1px" height="280px"></Box>
      <Box border="1px" height="280px"></Box>
      <Box border="1px" height="280px"></Box>
    </Grid>
  );
};

const AllCoursesPageRoute = ({ ...rest }) => {
  return <Route {...rest} render={(props) => <AllCoursesPage {...props} />} />;
};

export default AllCoursesPageRoute;
