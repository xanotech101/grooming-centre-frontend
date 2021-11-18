import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useCache } from "../../../../../contexts";
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
const useAssessmentPreview = (sidebarLinks, assessmentId, isForAdmin) => {
  const { handleGetOrSetAndGet } = useCache();
  const componentIsMount = useComponentIsMount();
  const { assessment_id } = useParams();

  assessmentId = assessmentId || assessment_id;
  const assessmentIsNew = assessmentId === "new";

  const queryParams = useQueryParams();
  const isExamination = queryParams.get("examination");

  const index = sidebarLinks?.findIndex((link) => link.id === assessmentId);
  const currentAssessmentLink = { text: sidebarLinks?.[index]?.text };

  const [assessmentDetails, setAssessmentDetails] = useState({
    data: null,
    loading: false,
    err: null,
  });

  const fetcher = useCallback(async () => {
    console.log(isForAdmin);
    const data = await (isExamination
      ? // `assessmentId` is `examinationId` in this case

        requestExaminationDetails(assessmentId, isForAdmin)
      : requestAssessmentDetails(assessmentId, isForAdmin));

    return isExamination ? data.examination : data.assessment;
  }, [assessmentId, isExamination, isForAdmin]);

  const fetchAssessmentDetails = useCallback(async () => {
    setAssessmentDetails({ loading: true });

    try {
      const assessmentDetails = await handleGetOrSetAndGet(
        assessmentId,
        fetcher
      );
      console.log(assessmentDetails);

      if (componentIsMount) setAssessmentDetails({ data: assessmentDetails });
    } catch (err) {
      console.error(err);
      if (componentIsMount) setAssessmentDetails({ err: err.message });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [assessmentId, componentIsMount]);

  const handleFetch = () => {
    if (!assessmentIsNew) fetchAssessmentDetails();
  };

  useEffect(() => {
    handleFetch();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
    handleFetch,
  };
};

export default useAssessmentPreview;
