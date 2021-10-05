import { useCallback, useEffect, useState } from "react";
import { Route } from "react-router-dom";
import useComponentIsMount from "../../../hooks/useComponentIsMount";
import { CoursesGridLayout } from "../../../layouts";
import { userGetCourseListing } from "../../../services";

const useCourses = () => {
  const componentIsMount = useComponentIsMount();
  const [courses, setCourses] = useState({
    data: null,
    loading: false,
    err: null,
  });

  const fetchCourses = useCallback(async () => {
    setCourses({ loading: true });

    try {
      const { courses } = await userGetCourseListing();

      if (componentIsMount) setCourses({ data: courses });
    } catch (err) {
      if (componentIsMount) setCourses({ err: err.message });
    }
  }, [componentIsMount]);

  useEffect(() => {
    fetchCourses();
  }, [fetchCourses]);

  return {
    courses,
  };
};

const AllCoursesPage = () => {
  const { courses } = useCourses();

  return <CoursesGridLayout courses={courses} />;
};

const AllCoursesPageRoute = ({ ...rest }) => {
  return <Route {...rest} render={(props) => <AllCoursesPage {...props} />} />;
};

export default AllCoursesPageRoute;
