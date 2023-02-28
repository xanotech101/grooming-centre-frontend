import { Route, useParams } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import { useCache } from "../../../../../contexts";
import useComponentIsMount from "../../../../../hooks/useComponentIsMount";
import { adminGetUserGrades } from "../../../../../services";
import { Grades } from "../../../../user";

const useGradeDetails = () => {
  const { handleGetOrSetAndGet } = useCache();
  const componentIsMount = useComponentIsMount();

  const {id: userId} = useParams();

  const [gradeDetails, setGradeDetails] = useState({
    data:null,
    loading: false,
    err: null,
  });

  const fetcher = useCallback(async () => {
    const { grades } = await adminGetUserGrades(userId);
    return grades;
  }, [userId]);
  const fetchGradeDetails = useCallback(async () => {
    setGradeDetails({ loading: true });

    try {
      const gradeDetails = await handleGetOrSetAndGet("gradeDetails", fetcher);
      // console.log(gradeDetails);
      if (componentIsMount) setGradeDetails({ data: gradeDetails });
    } catch (err) {
      console.log(err.message);
      if (componentIsMount) setGradeDetails({ err: err.message });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [componentIsMount]);

  useEffect(() => {
    fetchGradeDetails();
  }, [fetchGradeDetails]);

  const grades = gradeDetails.data;
  const isLoading = gradeDetails.loading;
  const error = gradeDetails.err;

  return {
    grades,
    isLoading,
    error,
  };
};

const GradeHistoryPage = () => {
  const manager = useGradeDetails();

  const { grades, isLoading } = manager;
  console.log(grades);

  return  <Grades isLoading={isLoading}  grades={grades} />
};

const GradeHistoryPageRoute = ({ ...rest }) => {
  return (
    <Route {...rest} render={(props) => <GradeHistoryPage {...props} />} />
  );
};

export default GradeHistoryPageRoute;
