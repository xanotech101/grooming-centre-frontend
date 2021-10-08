import { useCallback, useEffect, useState } from "react";
import { useCache } from "../../../../contexts";
import useComponentIsMount from "../../../../hooks/useComponentIsMount";
import { userGetCourseListing } from "../../../../services";

const useCourses = () => {
  const { handleGetOrSetAndGet } = useCache();

  const componentIsMount = useComponentIsMount();
  const [courses, setCourses] = useState({
    data: null,
    loading: false,
    err: null,
  });

  const fetcher = useCallback(async () => {
    const { courses } = await userGetCourseListing();
    return courses;
  }, []);

  const fetchCourses = useCallback(async () => {
    setCourses({ loading: true });

    try {
      const courses = await handleGetOrSetAndGet("courses", fetcher);

      if (componentIsMount) setCourses({ data: courses });
    } catch (err) {
      if (componentIsMount) setCourses({ err: err.message });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [componentIsMount]);

  useEffect(() => {
    fetchCourses();
  }, [fetchCourses]);

  return {
    courses,
  };
};

export default useCourses;
