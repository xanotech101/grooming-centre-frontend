import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useCache } from "../../../../../contexts";
import useComponentIsMount from "../../../../../hooks/useComponentIsMount";
import { requestAssessmentDetails } from "../../../../../services";

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
  const { handleGetOrSetAndGet } = useCache();
  const componentIsMount = useComponentIsMount();
  const { assessment_id } = useParams();

  const index = sidebarLinks?.findIndex((link) => link.id === assessment_id);
  const currentAssessmentLink = { text: sidebarLinks?.[index]?.text };

  const [assessmentDetails, setAssessmentDetails] = useState({
    data: null,
    loading: false,
    err: null,
  });

  const fetcher = useCallback(async () => {
    const { assessment } = await requestAssessmentDetails(assessment_id);

    return assessment;
  }, [assessment_id]);

  const fetchAssessmentDetails = useCallback(async () => {
    setAssessmentDetails({ loading: true });

    try {
      const assessmentDetails = await handleGetOrSetAndGet(
        assessment_id,
        fetcher
      );

      if (componentIsMount) setAssessmentDetails({ data: assessmentDetails });
    } catch (err) {
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

  return {
    assessment,
    isLoading,
    error,
  };
};

export default useAssessmentPreview;
