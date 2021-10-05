import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useComponentIsMount from "../../../../../hooks/useComponentIsMount";
import { userGetCourseDetails } from "../../../../../services";

const useCourseDetails = () => {
  const componentIsMount = useComponentIsMount();
  const [courseDetails, setCourseDetails] = useState({
    data: null,
    loading: false,
    err: null,
  });
  let { id } = useParams();

  const fetchCourseDetails = useCallback(async () => {
    console.log(id);

    setCourseDetails({ loading: true });

    try {
      const { course } = await userGetCourseDetails(id);

      if (componentIsMount) setCourseDetails({ data: course });
    } catch (err) {
      if (componentIsMount) setCourseDetails({ err: err.message });
    }
  }, [componentIsMount, id]);

  useEffect(() => {
    fetchCourseDetails();
  }, [fetchCourseDetails]);

  return {
    courseDetails,
  };
};

export default useCourseDetails;
