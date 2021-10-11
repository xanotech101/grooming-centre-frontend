import { useCallback, useEffect, useState } from "react";
import { requestCoursesOverviewDetails } from "../../../../../services";
import { useCache } from "../../../../../contexts";
import useComponentIsMount from "../../../../../hooks/useComponentIsMount";


const useCoursesOverviewDetails = () => {

const { handleGetOrSetAndGet } = useCache();
const componentIsMount = useComponentIsMount();

const [coursesOverviewDetails, setCoursesOverviewDetails] = useState({
  data: null,
  loading: false,
  err: null,
});

const fetcher = useCallback(async () => {
  const { coursesOverview } = await requestCoursesOverviewDetails();
  return coursesOverview;
}, []);
const fetchCoursesOverviewDetails = useCallback(async () => {
  setCoursesOverviewDetails({ loading: true });

  try {
    const coursesOverviewDetails = await handleGetOrSetAndGet(fetcher);
    if (componentIsMount)
      setCoursesOverviewDetails({ data: coursesOverviewDetails });
  } catch (err) {
    if (componentIsMount) setCoursesOverviewDetails({ err: err.message });
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
}, [componentIsMount]);
  
   useEffect(() => {
     fetchCoursesOverviewDetails();
   }, [fetchCoursesOverviewDetails]);

   const coursesOverview = coursesOverviewDetails.data;
   const isLoading = coursesOverviewDetails.loading;
   const error = coursesOverviewDetails.err;
   

   return {
     coursesOverview,
     isLoading,
     error
   };
 }

 export default useCoursesOverviewDetails;