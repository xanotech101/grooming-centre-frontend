import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
// import { useCache } from "../../../../../contexts";
import useComponentIsMount from "../../../../../hooks/useComponentIsMount";
import useQueryParams from "../../../../../hooks/useQueryParams";
import {
  requestAssessmentDetails,
  requestExaminationDetails,
} from "../../../../../services";

/**
 * Assessment state`Manager`
 * @param { Array<{}> | null } sidebarLinks
 *
 * @returns {{
 *  assessment: Assessment,
 *  isLoading: boolean,
 *  error: string | null,
 * }}
 */
const useAssessmentPreview = (sidebarLinks) => {
  // const { handleGetOrSetAndGet } = useCache();
  const componentIsMount = useComponentIsMount();
  const { assessment_id } = useParams();
  const queryParams = useQueryParams();
  const isExamination = queryParams.get("examination");

  const index = sidebarLinks?.findIndex((link) => link.id === assessment_id);
  const currentAssessmentLink = { text: sidebarLinks?.[index]?.text };

  const [assessmentDetails, setAssessmentDetails] = useState({
    data: null,
    loading: false,
    err: null,
  });

  const fetcher = useCallback(async () => {
    const data = await (isExamination
      ? // `assessment_id` is `examinationId` in this case
        requestExaminationDetails(assessment_id)
      : requestAssessmentDetails(assessment_id));

    return isExamination ? data.examination : data.assessment;
  }, [assessment_id, isExamination]);
  // eslint-disable-next-line react-hooks/exhaustive-deps

  const fetchAssessmentDetails = useCallback(async () => {
    setAssessmentDetails({ loading: true });

    try {
      // const assessmentDetails = await handleGetOrSetAndGet(
      //   assessment_id,
      //   fetcher
      // );
      const assessmentDetails = await fetcher();

      console.log(assessmentDetails, assessment_id);

      if (componentIsMount) setAssessmentDetails({ data: assessmentDetails });
    } catch (err) {
      console.error(err);
      if (componentIsMount) setAssessmentDetails({ err: err.message });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [assessment_id, componentIsMount]);

  useEffect(() => {
    fetchAssessmentDetails();
  }, [fetchAssessmentDetails]);

  const assessment = { ...currentAssessmentLink, ...assessmentDetails.data };
  const isLoading = assessmentDetails.loading;
  const error = assessmentDetails.err;

  const setError = (msg) => setAssessmentDetails({ err: msg });

  return {
    assessment,
    isLoading,
    error,
    setError,
    isExamination,
  };
};

export default useAssessmentPreview;
