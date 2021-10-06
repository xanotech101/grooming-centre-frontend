import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useCache } from "../../../../../contexts";
import useComponentIsMount from "../../../../../hooks/useComponentIsMount";
import { userGetCourseDetails } from "../../../../../services";

const useCourseDetails = () => {
  const { handleGetOrSetAndGet } = useCache();
  const componentIsMount = useComponentIsMount();
  const [courseDetails, setCourseDetails] = useState({
    data: null,
    loading: false,
    err: null,
  });
  let { id } = useParams();

  const fetcher = useCallback(async () => {
    const { course } = await userGetCourseDetails(id);

    return course;
  }, [id]);

  const fetchCourseDetails = useCallback(async () => {
    setCourseDetails({ loading: true });

    try {
      const courseDetails = await handleGetOrSetAndGet(
        "courseDetails",
        fetcher
      );

      if (componentIsMount) setCourseDetails({ data: courseDetails });
    } catch (err) {
      if (componentIsMount) setCourseDetails({ err: err.message });
    }
  }, [fetcher, handleGetOrSetAndGet, componentIsMount]);

  useEffect(() => {
    fetchCourseDetails();
  }, [fetchCourseDetails]);

  return {
    courseDetails,
  };
};

export default useCourseDetails;
