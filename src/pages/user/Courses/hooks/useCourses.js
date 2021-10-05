import { useCallback, useEffect, useState } from "react";
import useComponentIsMount from "../../../../hooks/useComponentIsMount";
import { userGetCourseListing } from "../../../../services";

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

export default useCourses;
